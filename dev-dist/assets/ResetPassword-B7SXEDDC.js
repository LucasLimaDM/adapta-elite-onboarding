import { t as LoaderCircle } from "./loader-circle-Bahjpv76.js";
import { A as require_react, O as useNavigate, S as require_jsx_runtime, T as useToast, j as __toESM, r as useAuthStore, t as Button } from "./index-evE1m07u.js";
import { r as Input, t as Label } from "./label-CyA0Rwal.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function ResetPassword() {
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const { updatePassword, logout } = useAuthStore();
	const navigate = useNavigate();
	const { toast } = useToast();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast({
				title: "Senhas não coincidem",
				description: "A nova senha e a confirmação devem ser iguais.",
				variant: "destructive"
			});
			return;
		}
		if (password.length < 6) {
			toast({
				title: "Senha muito curta",
				description: "A senha deve ter pelo menos 6 caracteres.",
				variant: "destructive"
			});
			return;
		}
		setIsSubmitting(true);
		try {
			await updatePassword(password);
			toast({
				title: "Senha atualizada",
				description: "Sua senha foi atualizada com sucesso. Faça login novamente."
			});
			logout();
			navigate("/login", { replace: true });
		} catch (err) {
			toast({
				title: "Erro",
				description: err.message || "Ocorreu um erro ao atualizar sua senha.",
				variant: "destructive"
			});
		} finally {
			setIsSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/ResetPassword.tsx:60:5",
		"data-prohibitions": "[editContent]",
		className: "min-h-[80vh] flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/ResetPassword.tsx:61:7",
			"data-prohibitions": "[editContent]",
			className: "w-full max-w-md space-y-8 bg-[#111111]/80 p-8 rounded-2xl border border-[#333333] shadow-elevation animate-in fade-in duration-500",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ResetPassword.tsx:62:9",
				"data-prohibitions": "[]",
				className: "space-y-2 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/ResetPassword.tsx:63:11",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold font-display tracking-tight",
					children: "Nova Senha"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/ResetPassword.tsx:64:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Digite sua nova senha abaixo"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-uid": "src/pages/ResetPassword.tsx:67:9",
				"data-prohibitions": "[editContent]",
				onSubmit: handleSubmit,
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/ResetPassword.tsx:68:11",
					"data-prohibitions": "[]",
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/ResetPassword.tsx:69:13",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/ResetPassword.tsx:70:15",
							"data-prohibitions": "[]",
							htmlFor: "password",
							children: "Nova Senha"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/ResetPassword.tsx:71:15",
							"data-prohibitions": "[editContent]",
							id: "password",
							type: "password",
							placeholder: "••••••••",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							required: true
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/ResetPassword.tsx:80:13",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/ResetPassword.tsx:81:15",
							"data-prohibitions": "[]",
							htmlFor: "confirmPassword",
							children: "Confirmar Nova Senha"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/ResetPassword.tsx:82:15",
							"data-prohibitions": "[editContent]",
							id: "confirmPassword",
							type: "password",
							placeholder: "••••••••",
							value: confirmPassword,
							onChange: (e) => setConfirmPassword(e.target.value),
							required: true
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/ResetPassword.tsx:93:11",
					"data-prohibitions": "[editContent]",
					type: "submit",
					className: "w-full h-12 text-base",
					disabled: isSubmitting || !password || !confirmPassword,
					children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						"data-uid": "src/pages/ResetPassword.tsx:98:29",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 animate-spin mr-2"
					}) : null, "Atualizar Senha"]
				})]
			})]
		})
	});
}
export { ResetPassword as default };

//# sourceMappingURL=ResetPassword-B7SXEDDC.js.map