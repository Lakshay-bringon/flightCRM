import React, { useRef, useState } from 'react';
import { z } from 'zod';
import Modal from '../../components/Modal';
import Form, { FormField, FormInput, FormSelect, FormActions, FormButton } from '../../components/Form';

const userSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  alias: z.string().min(2, 'Alias is required'),
  photo: z.any().optional(),
  email: z.string().email('Invalid email'),
  confirmEmail: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(8, 'Phone is required'),
  role: z.string().min(1, 'Role is required'),
  team: z.string().min(1, 'Team is required').optional(),
}).refine((data) => data.email === data.confirmEmail, {
  message: 'Emails do not match',
  path: ['confirmEmail'],
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
}).refine((data) => {
  if (data.role === 'Agent') {
    return !!data.team;
  }
  return true;
}, {
  message: 'Team is required for Agents',
  path: ['team'],
});

export default function UserDetailsForm({ user = null, teams = [], onSubmit: onSubmitProp, onClose }) {
  const [photoPreview, setPhotoPreview] = useState(user?.photoUrl || null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user?.role || '');
  const inputFileRef = useRef(null);

  const initialData = user
    ? {
        name: user.name || '',
        alias: user.alias || '',
        phone: user.phone || '',
        email: user.email || '',
        confirmEmail: user.email || '',
        password: '',
        confirmPassword: '',
        photo: undefined,
        role: user.role || '',
        team: user.team || '',
      }
    : {};

  const onPhotoChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) onPhotoChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) onPhotoChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const openFileDialog = () => {
    inputFileRef.current?.click();
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={user ? 'Edit User Details' : 'Add User Details'}
    >
      <Form
        schema={userSchema}
        defaultValues={initialData}
        onSubmit={(data) => onSubmitProp?.({ ...data, photo: photoPreview })}
        className="space-y-3 overflow-y-auto pr-6"
        style={{ maxHeight: 'calc(90vh - 3rem)' }}
      >
        {({ register, formState: { errors }, setValue }) => (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-2">
              <div className="flex-1 space-y-2">
                <FormField error={errors.name?.message}>
                  <FormInput {...register('name')} placeholder="Name" />
                </FormField>

                <FormField error={errors.alias?.message}>
                  <FormInput {...register('alias')} placeholder="Alias" />
                </FormField>

                <FormField error={errors.phone?.message}>
                  <FormInput {...register('phone')} placeholder="Phone Number" />
                </FormField>

                <FormField error={errors.role?.message}>
                  <FormSelect 
                    {...register('role')} 
                    value={selectedRole} 
                    onChange={e => {
                      setSelectedRole(e.target.value);
                      setValue('role', e.target.value);
                    }}
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Leader">Leader</option>
                    <option value="Agent">Agent</option>
                  </FormSelect>
                </FormField>

                {selectedRole === 'Agent' && (
                  <FormField error={errors.team?.message}>
                    <FormSelect {...register('team')}>
                      <option value="">Select Team</option>
                      {teams.map(team => (
                        <option key={team} value={team}>{team}</option>
                      ))}
                    </FormSelect>
                  </FormField>
                )}
              </div>

              <div className="flex flex-col items-center justify-center min-w-[100px]">
                <div
                  className={`relative w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer bg-gray-700 ${
                    dragActive ? 'border-blue-400 bg-blue-900/30' : 'border-gray-500'
                  }`}
                  onClick={openFileDialog}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  tabIndex={0}
                  role="button"
                  aria-label="Upload Photo"
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="object-cover w-full h-full rounded-full" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-1a1 1 0 011-1h4a1 1 0 011 1v1a1 1 0 01-1 1z" />
                      </svg>
                      <span className="text-[10px] text-center">
                        Click or Drag & Drop
                        <br />
                        to upload
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputFileRef}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    style={{ display: 'none' }}
                    onChange={handleFileInput}
                    tabIndex={-1}
                  />
                </div>
              </div>
            </div>

            <FormField error={errors.email?.message}>
              <FormInput {...register('email')} placeholder="Email" />
            </FormField>

            <FormField error={errors.confirmEmail?.message}>
              <FormInput {...register('confirmEmail')} placeholder="Confirm Email" />
            </FormField>

            <FormField error={errors.password?.message}>
              <FormInput type="password" {...register('password')} placeholder="Password" />
            </FormField>

            <FormField error={errors.confirmPassword?.message}>
              <FormInput type="password" {...register('confirmPassword')} placeholder="Confirm Password" />
            </FormField>

            <FormActions>
              <FormButton type="button" variant="danger" onClick={onClose}>
                Cancel
              </FormButton>
              <FormButton type="submit">
                {user ? 'Update User' : 'Save User'}
              </FormButton>
            </FormActions>
          </>
        )}
      </Form>
    </Modal>
  );
}
