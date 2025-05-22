import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const smtpSchema = z
	.object({
		host: z.string().min(1, "Host is required"),
		id: z.string().min(1, "SMTP ID is required"),
		confirmId: z.string().min(1, "Confirm SMTP ID is required"),
		password: z.string().min(8, "Password is required"),
		confirmPassword: z.string().min(8, "Confirm Password is required"),
	})
	.refine((data) => data.id === data.confirmId, {
		message: "SMTP ID and Confirm ID must match",
		path: ["confirmId"],
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password and Confirm Password must match",
		path: ["confirmPassword"],
	});

const providerSchema = z.object({
	name: z.string().min(1, "Provider name is required"),
	logo: z.string().optional(),
	status: z.enum(["Active", "Inactive"]),
	datetime: z.string(),
	smtp: smtpSchema.optional(),
});

export default function ProviderForm({ initialData = {}, onSubmit, onCancel }) {
	const nameRef = useRef(null);

	const defaultValues = {
		name: initialData.name || "",
		logo: initialData.logo || "",
		status: initialData.status || "Active",
		datetime:
			initialData.datetime ||
			new Date().toISOString().slice(0, 19).replace("T", " "),
		smtp: initialData.smtp
			? {
					...initialData.smtp,
					confirmId: initialData.smtp.id,
					confirmPassword: initialData.smtp.password,
			  }
			: undefined,
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
		clearErrors,
	} = useForm({
		resolver: zodResolver(providerSchema),
		defaultValues,
		mode: "onBlur",
	});

	useEffect(() => {
		setFocus("name");
	}, [setFocus]);

	const onFormSubmit = (data) => {
		const smtp = data.smtp
			? (({ confirmId, confirmPassword, ...rest }) => rest)(data.smtp)
			: undefined;
		onSubmit({ ...data, smtp });
	};

	return (
		<form
			onSubmit={handleSubmit(onFormSubmit)}
			className="space-y-4 max-h-[80vh] overflow-y-auto w-full"
		>
			<div className="max-w-2xl px-2 mx-auto w-full">
				<div>
					<label className="block text-sm text-gray-300">Provider Name</label>
					<input
						{...register("name")}
						ref={nameRef}
						className="w-full px-3 py-2 rounded bg-gray-700 text-white"
						required
					/>
					{errors.name && (
						<p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
					)}
				</div>
				<div>
					<label className="block text-sm text-gray-300">Logo URL</label>
					<input
						{...register("logo")}
						className="w-full px-3 py-2 rounded bg-gray-700 text-white"
					/>
				</div>
				<div>
					<label className="block text-sm text-gray-300">Status</label>
					<select
						{...register("status")}
						className="w-full px-3 py-2 rounded bg-gray-700 text-white"
					>
						<option value="Active">Active</option>
						<option value="Inactive">Inactive</option>
					</select>
				</div>
				<input type="hidden" {...register("datetime")} />

				{/* SMTP fields directly in the form, styled to match the rest of the form */}
				<div className="mt-4">
					<label className="block text-sm text-gray-300 mb-2">
						SMTP Details
					</label>
					<div className="mb-2">
						<label className="block text-xs text-gray-400">SMTP Host</label>
						<input
							{...register(`smtp.host`)}
							className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
						{errors.smtp?.host && (
							<p className="text-xs text-red-400 mt-1">
								{errors.smtp.host.message}
							</p>
						)}
					</div>
					<div className="mb-2">
						<label className="block text-xs text-gray-400">SMTP ID</label>
						<input
							{...register(`smtp.id`)}
							className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
						{errors.smtp?.id && (
							<p className="text-xs text-red-400 mt-1">
								{errors.smtp.id.message}
							</p>
						)}
					</div>
					<div className="mb-2">
						<label className="block text-xs text-gray-400">
							Confirm SMTP ID
						</label>
						<input
							{...register(`smtp.confirmId`)}
							className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
						{errors.smtp?.confirmId && (
							<p className="text-xs text-red-400 mt-1">
								{errors.smtp.confirmId.message}
							</p>
						)}
					</div>
					<div className="mb-2">
						<label className="block text-xs text-gray-400">SMTP Password</label>
						<input
							type="password"
							{...register(`smtp.password`)}
							className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
						{errors.smtp?.password && (
							<p className="text-xs text-red-400 mt-1">
								{errors.smtp.password.message}
							</p>
						)}
					</div>
					<div className="mb-2">
						<label className="block text-xs text-gray-400">
							Confirm SMTP Password
						</label>
						<input
							type="password"
							{...register(`smtp.confirmPassword`)}
							className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
						{errors.smtp?.confirmPassword && (
							<p className="text-xs text-red-400 mt-1">
								{errors.smtp.confirmPassword.message}
							</p>
						)}
					</div>
				</div>

				<div className="flex gap-2 justify-end mt-4">
					<button
						type="button"
						onClick={onCancel}
						className="px-4 py-2 bg-gray-600 text-white rounded"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-600 text-white rounded"
					>
						Save
					</button>
				</div>
			</div>
		</form>
	);
}
