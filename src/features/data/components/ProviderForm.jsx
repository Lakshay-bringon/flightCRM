import React, { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
	smtp: z.array(smtpSchema).optional(),
});

export default function ProviderForm({ initialData = {}, onSubmit, onCancel }) {
	const [showSmtp, setShowSmtp] = useState(
		(initialData.smtp && initialData.smtp.length > 0) || false
	);
	const [smtpOpen, setSmtpOpen] = useState(true);
	const nameRef = useRef(null);

	const defaultValues = {
		name: initialData.name || "",
		logo: initialData.logo || "",
		status: initialData.status || "Active",
		datetime:
			initialData.datetime ||
			new Date().toISOString().slice(0, 19).replace("T", " "),
		smtp:
			initialData.smtp && initialData.smtp.length > 0
				? initialData.smtp.map((s) => ({
						...s,
						confirmId: s.id,
						confirmPassword: s.password,
				  }))
				: [],
	};

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		setFocus,
		clearErrors,
	} = useForm({
		resolver: zodResolver(providerSchema),
		defaultValues,
		mode: "onBlur",
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "smtp",
	});

	useEffect(() => {
		setFocus("name");
	}, [setFocus]);

	const onFormSubmit = (data) => {
		const smtp =
			data.smtp?.map(({ confirmId, confirmPassword, ...rest }) => rest) || [];
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
				<div>
					<div className="flex items-center justify-between mt-4">
						<label className="block text-sm text-gray-300">SMTP Details</label>

						<button
							type="button"
							onClick={() => {
								setShowSmtp(true);
								append({
									host: "",
									id: "",
									confirmId: "",
									password: "",
									confirmPassword: "",
								});
								setSmtpOpen(true);
							}}
							className="inline-flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded shadow text-xs font-medium"
						>
							+ Add SMTP
						</button>
					</div>
					{showSmtp &&
						smtpOpen &&
						fields.map((field, idx) => (
							<div
								key={field.id}
								className="border border-gray-600 rounded p-3  mt-2 mb-2 bg-gray-700"
							>
								<div className="mb-2">
									<label className="block text-xs text-gray-400">
										SMTP Host
									</label>
									<input
										{...register(`smtp.${idx}.host`)}
										className="w-full px-2 py-1 rounded bg-gray-800 text-white"
										required
									/>
									{errors.smtp?.[idx]?.host && (
										<p className="text-xs text-red-400 mt-1">
											{errors.smtp[idx].host.message}
										</p>
									)}
								</div>
								<div className="mb-2">
									<label className="block text-xs text-gray-400">SMTP ID</label>
									<input
										{...register(`smtp.${idx}.id`)}
										className="w-full px-2 py-1 rounded bg-gray-800 text-white"
										required
									/>
									{errors.smtp?.[idx]?.id && (
										<p className="text-xs text-red-400 mt-1">
											{errors.smtp[idx].id.message}
										</p>
									)}
								</div>
								<div className="mb-2">
									<label className="block text-xs text-gray-400">
										Confirm SMTP ID
									</label>
									<input
										{...register(`smtp.${idx}.confirmId`)}
										className="w-full px-2 py-1 rounded bg-gray-800 text-white"
										required
									/>
									{errors.smtp?.[idx]?.confirmId && (
										<p className="text-xs text-red-400 mt-1">
											{errors.smtp[idx].confirmId.message}
										</p>
									)}
								</div>
								<div className="mb-2">
									<label className="block text-xs text-gray-400">
										SMTP Password
									</label>
									<input
										type="password"
										{...register(`smtp.${idx}.password`)}
										className="w-full px-2 py-1 rounded bg-gray-800 text-white"
										required
									/>
									{errors.smtp?.[idx]?.password && (
										<p className="text-xs text-red-400 mt-1">
											{errors.smtp[idx].password.message}
										</p>
									)}
								</div>
								<div className="mb-2">
									<label className="block text-xs text-gray-400">
										Confirm SMTP Password
									</label>
									<input
										type="password"
										{...register(`smtp.${idx}.confirmPassword`)}
										className="w-full px-2 py-1 rounded bg-gray-800 text-white"
										required
									/>
									{errors.smtp?.[idx]?.confirmPassword && (
										<p className="text-xs text-red-400 mt-1">
											{errors.smtp[idx].confirmPassword.message}
										</p>
									)}
								</div>
								<div className="flex justify-between items-center">
									<button
										type="button"
										onClick={() => {
											remove(idx);
											clearErrors(`smtp.${idx}.host`);
										}}
										className="text-xs text-red-400 underline"
									>
										Remove SMTP
									</button>
								</div>
							</div>
						))}
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
