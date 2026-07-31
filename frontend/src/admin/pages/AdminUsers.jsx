import React, { useState, useEffect } from 'react';
import { Search, Users, ShieldCheck, User as UserIcon, Trash2, RefreshCw, Eye, X, CheckCircle, AlertCircle, Phone, Mail, Calendar, ShieldAlert } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { getAdminUsers, updateUserStatus, updateUserRole, deleteAdminUser } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

export const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
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
      list = list.filter(u =>
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phone?.toLowerCase().includes(q)
      );
    }

    if (statusFilter === 'Active') {
      list = list.filter(u => u.isActive !== false);
    } else if (statusFilter === 'Inactive') {
      list = list.filter(u => u.isActive === false);
    } else if (statusFilter === 'Admin') {
      list = list.filter(u => u.role === 'admin');
    } else if (statusFilter === 'Customer') {
      list = list.filter(u => u.role === 'user');
    }

    setFiltered(list);
  }, [searchQuery, statusFilter, users]);

  const handleToggleStatus = async (targetUser) => {
    if (targetUser._id === currentUser?._id) {
      toast.error("You cannot deactivate your own account.");
      return;
    }
    const newStatus = !targetUser.isActive;
    try {
      await updateUserStatus(targetUser._id, newStatus);
      setUsers(prev => prev.map(u => u._id === targetUser._id ? { ...u, isActive: newStatus } : u));
      if (selectedUser && selectedUser._id === targetUser._id) {
        setSelectedUser(prev => ({ ...prev, isActive: newStatus }));
      }
      toast.success(`User ${targetUser.name} ${newStatus ? 'activated' : 'deactivated'}.`);
    } catch (err) {
      toast.error(err.message || 'Failed to update user status.');
    }
  };

  const handleRoleToggle = async (targetUser) => {
    if (targetUser._id === currentUser?._id) {
      toast.error("You cannot change your own role.");
      return;
    }
    const newRole = targetUser.role === 'admin' ? 'user' : 'admin';
    try {
      await updateUserRole(targetUser._id, newRole);
      setUsers(prev => prev.map(u => u._id === targetUser._id ? { ...u, role: newRole } : u));
      if (selectedUser && selectedUser._id === targetUser._id) {
        setSelectedUser(prev => ({ ...prev, role: newRole }));
      }
      toast.success(`User role updated to "${newRole}".`);
    } catch (err) {
      toast.error(err.message || 'Failed to update role.');
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
      if (selectedUser && selectedUser._id === targetUser._id) setSelectedUser(null);
      toast.success('User removed successfully.');
      setDeleteConfirm(null);
    } catch (err) {
      toast.error(err.message || 'Failed to delete user.');
    }
  };

  return (
    <AdminLayout
      title="User Management"
      subtitle={`${users.length} registered customers and administrators`}
      actions={
        <button onClick={loadUsers} className="p-2.5 border border-beige bg-cream rounded-xl text-muted hover:text-sage transition-colors cursor-pointer" title="Refresh">
          <RefreshCw className="w-4 h-4" />
        </button>
      }
    >
      {/* Search & Status Filter */}
      <div className="bg-cream border border-beige rounded-2xl p-4 shadow-warm-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-ivory border border-beige rounded-xl text-xs sm:text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-ivory border border-beige rounded-xl px-3 py-2 text-xs sm:text-sm text-earth focus:outline-none focus:ring-2 focus:ring-sage/40 cursor-pointer"
        >
          <option value="All">All Users</option>
          <option value="Customer">Customers</option>
          <option value="Admin">Admins</option>
          <option value="Active">Active Accounts</option>
          <option value="Inactive">Deactivated Accounts</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-cream border border-beige rounded-2xl shadow-warm-sm overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 bg-ivory border-b border-beige text-[11px] font-bold uppercase tracking-wider text-muted">
          <div className="col-span-4">User Details</div>
          <div className="col-span-3">Email & Phone</div>
          <div className="col-span-2 text-center">Role</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>

        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-14 bg-beige/40 rounded-xl animate-pulse" />)}
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
              const isActive = u.isActive !== false;

              return (
                <div key={u._id} className={`flex flex-col md:grid md:grid-cols-12 gap-3 items-start md:items-center px-5 py-4 hover:bg-ivory transition-colors ${isCurrentUser ? 'bg-sage/5' : ''}`}>
                  {/* User Profile Info */}
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sage text-cream flex items-center justify-center font-bold text-sm shrink-0 border border-beige shadow-warm-sm">
                      {u.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-earth flex items-center gap-1.5 truncate">
                        {u.name}
                        {isCurrentUser && <span className="text-[10px] bg-sage/10 text-sage px-1.5 py-0.5 rounded-md font-semibold">You</span>}
                      </p>
                      <p className="text-[11px] text-muted">Joined {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'Recently'}</p>
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="col-span-3">
                    <p className="text-xs text-earth truncate">{u.email}</p>
                    <p className="text-[11px] text-muted">{u.phone || 'No phone'}</p>
                  </div>

                  {/* Role */}
                  <div className="col-span-2 md:text-center">
                    <button
                      onClick={() => handleRoleToggle(u)}
                      disabled={isCurrentUser}
                      title={isCurrentUser ? "Your account" : "Click to toggle role"}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${u.role === 'admin' ? 'bg-terracotta/10 text-terracotta border-terracotta/30' : 'bg-sage/10 text-sage border-sage/30'}`}
                    >
                      {u.role === 'admin' ? <ShieldCheck className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                      {u.role === 'admin' ? 'Admin' : 'Customer'}
                    </button>
                  </div>

                  {/* Status Toggle */}
                  <div className="col-span-1 md:text-center">
                    <button
                      onClick={() => handleToggleStatus(u)}
                      disabled={isCurrentUser}
                      title={isCurrentUser ? "Your account" : "Click to activate/deactivate"}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border cursor-pointer ${isActive ? 'bg-success/10 text-success border-success/30' : 'bg-error/10 text-error border-error/30'}`}
                    >
                      {isActive ? 'Active' : 'Disabled'}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex items-center gap-2 md:justify-center">
                    <button
                      onClick={() => setSelectedUser(u)}
                      className="p-2 rounded-xl border border-beige text-muted hover:text-sage hover:bg-sage/10 transition-colors cursor-pointer"
                      title="View Profile Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {!isCurrentUser && (
                      deleteConfirm === u._id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleDelete(u)} className="px-2 py-1 text-[10px] font-bold text-cream bg-rose rounded-lg">Confirm</button>
                          <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 text-[10px] font-semibold text-earth border border-beige rounded-lg">No</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(u._id)}
                          className="p-2 rounded-xl border border-beige text-muted hover:text-rose hover:bg-rose/10 transition-colors cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* User Profile View Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-cream border border-beige rounded-2xl max-w-lg w-full p-6 shadow-warm-md relative space-y-5">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl border border-beige text-earth hover:bg-beige/40 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-terracotta text-xs font-bold uppercase tracking-wider">
              <span>USER PROFILE</span>
            </div>

            <div className="flex items-center gap-4 border-b border-beige/60 pb-4">
              <div className="w-14 h-14 rounded-full bg-sage text-cream flex items-center justify-center font-bold text-xl border border-beige shadow-warm-sm">
                {selectedUser.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-earth">{selectedUser.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${selectedUser.role === 'admin' ? 'bg-terracotta/10 text-terracotta border-terracotta/30' : 'bg-sage/10 text-sage border-sage/30'}`}>
                    {selectedUser.role === 'admin' ? 'Admin' : 'Customer'}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${selectedUser.isActive !== false ? 'bg-success/10 text-success border-success/30' : 'bg-error/10 text-error border-error/30'}`}>
                    {selectedUser.isActive !== false ? 'Active Account' : 'Deactivated'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2.5 text-earth">
                <Mail className="w-4 h-4 text-sage shrink-0" />
                <span><strong>Email:</strong> {selectedUser.email}</span>
              </div>

              <div className="flex items-center gap-2.5 text-earth">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span><strong>Phone:</strong> {selectedUser.phone || 'Not provided'}</span>
              </div>

              <div className="flex items-center gap-2.5 text-earth">
                <Calendar className="w-4 h-4 text-terracotta shrink-0" />
                <span><strong>Joined Date:</strong> {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Recent'}</span>
              </div>
            </div>

            {/* Quick Toggle Actions */}
            {selectedUser._id !== currentUser?._id && (
              <div className="pt-3 border-t border-beige/60 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleToggleStatus(selectedUser)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${selectedUser.isActive !== false ? 'bg-error/10 text-error border-error/30 hover:bg-error/20' : 'bg-success/10 text-success border-success/30 hover:bg-success/20'}`}
                >
                  {selectedUser.isActive !== false ? 'Deactivate Account' : 'Activate Account'}
                </button>

                <button
                  onClick={() => handleRoleToggle(selectedUser)}
                  className="flex-1 py-2 text-xs font-bold text-earth border border-beige rounded-xl hover:bg-beige/40 transition-colors cursor-pointer"
                >
                  Make {selectedUser.role === 'admin' ? 'Customer' : 'Admin'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
