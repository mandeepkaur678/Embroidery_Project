import React, { useState, useEffect } from 'react';
import { Search, Users, ShieldCheck, User, Trash2, RefreshCw, ChevronDown } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { getAdminUsers, updateUserRole, deleteAdminUser } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

export const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getAdminUsers();
      setUsers(data);
      setFiltered(data);
    } catch {
      toast.error('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  useEffect(() => {
    let list = [...users];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(u => u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q));
    }
    if (roleFilter !== 'All') {
      list = list.filter(u => u.role === roleFilter.toLowerCase());
    }
    setFiltered(list);
  }, [searchQuery, roleFilter, users]);

  const handleRoleToggle = async (targetUser) => {
    if (targetUser._id === currentUser?._id) {
      toast.error("You cannot change your own role.");
      return;
    }
    const newRole = targetUser.role === 'admin' ? 'user' : 'admin';
    try {
      await updateUserRole(targetUser._id, newRole);
      setUsers(prev => prev.map(u => u._id === targetUser._id ? { ...u, role: newRole } : u));
      toast.success(`User role updated to "${newRole}".`);
    } catch {
      toast.error('Failed to update role.');
    }
  };

  const handleDelete = async (targetUser) => {
    if (targetUser._id === currentUser?._id) {
      toast.error("You cannot delete your own account.");
      return;
    }
    try {
      await deleteAdminUser(targetUser._id);
      setUsers(prev => prev.filter(u => u._id !== targetUser._id));
      toast.success('User removed successfully.');
      setDeleteConfirm(null);
    } catch {
      toast.error('Failed to delete user.');
    }
  };

  return (
    <AdminLayout
      title="User Management"
      subtitle={`${users.length} registered customers and administrators`}
      actions={
        <button onClick={loadUsers} className="p-2.5 border border-beige bg-cream rounded-xl text-muted hover:text-sage transition-colors" title="Refresh">
          <RefreshCw className="w-4 h-4" />
        </button>
      }
    >
      {/* Search & Filter */}
      <div className="bg-cream border border-beige rounded-2xl p-4 shadow-warm-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-ivory border border-beige rounded-xl text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-ivory border border-beige rounded-xl px-3 py-2 text-sm text-earth focus:outline-none focus:ring-2 focus:ring-sage/40 cursor-pointer"
        >
          <option value="All">All Roles</option>
          <option value="User">Customer</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-cream border border-beige rounded-2xl shadow-warm-sm overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 bg-ivory border-b border-beige text-[11px] font-bold uppercase tracking-wider text-muted">
          <div className="col-span-4">User</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2 text-center">Role</div>
          <div className="col-span-2 text-center">Joined</div>
          <div className="col-span-1 text-center">Actions</div>
        </div>

        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-12 bg-beige/40 rounded-xl animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-14 text-center space-y-3">
            <Users className="w-10 h-10 text-sage mx-auto" />
            <p className="font-serif text-xl font-bold text-earth">No users found</p>
          </div>
        ) : (
          <div className="divide-y divide-beige/60">
            {filtered.map((u) => {
              const isCurrentUser = u._id === currentUser?._id;
              return (
                <div key={u._id} className={`flex flex-col md:grid md:grid-cols-12 gap-3 items-start md:items-center px-5 py-4 hover:bg-ivory transition-colors ${isCurrentUser ? 'bg-sage/5' : ''}`}>
                  {/* User Info */}
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-sage text-cream flex items-center justify-center font-bold text-sm shrink-0">
                      {u.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-earth flex items-center gap-1.5">
                        {u.name}
                        {isCurrentUser && <span className="text-[10px] bg-sage/10 text-sage px-1.5 py-0.5 rounded-md font-semibold">You</span>}
                      </p>
                      <p className="text-[11px] text-muted md:hidden">{u.email}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-span-3 hidden md:block">
                    <p className="text-xs text-charcoal truncate">{u.email}</p>
                  </div>

                  {/* Role Badge */}
                  <div className="col-span-2 md:text-center">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${u.role === 'admin' ? 'bg-terracotta/10 text-terracotta border-terracotta/30' : 'bg-sage/10 text-sage border-sage/30'}`}>
                      {u.role === 'admin' ? <ShieldCheck className="w-3 h-3" /> : <User className="w-3 h-3" />}
                      {u.role === 'admin' ? 'Admin' : 'Customer'}
                    </span>
                  </div>

                  {/* Joined Date */}
                  <div className="col-span-2 md:text-center">
                    <p className="text-xs text-muted">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '–'}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex items-center gap-2 md:justify-center">
                    {!isCurrentUser && (
                      <>
                        <button
                          onClick={() => handleRoleToggle(u)}
                          title={`Change to ${u.role === 'admin' ? 'Customer' : 'Admin'}`}
                          className="p-1.5 rounded-lg border border-beige text-muted hover:text-gold hover:border-gold/40 hover:bg-gold/10 transition-all"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        {deleteConfirm === u._id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleDelete(u)} className="px-1.5 py-0.5 text-[10px] font-bold text-cream bg-error rounded-md">Del</button>
                            <button onClick={() => setDeleteConfirm(null)} className="px-1.5 py-0.5 text-[10px] font-semibold text-earth border border-beige rounded-md">No</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(u._id)}
                            className="p-1.5 rounded-lg border border-beige text-muted hover:text-error hover:border-error/40 hover:bg-error/10 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
