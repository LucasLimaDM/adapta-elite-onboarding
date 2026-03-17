import { t as ArrowLeft } from "./arrow-left-CAy9WWtQ.js";
import { t as LoaderCircle } from "./loader-circle-Bahjpv76.js";
import { A as require_react, E as Link, S as require_jsx_runtime, T as useToast, j as __toESM, r as useAuthStore, t as Button } from "./index-evE1m07u.js";
import { r as Input, t as Label } from "./label-CyA0Rwal.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function ForgotPassword() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [isSuccess, setIsSuccess] = (0, import_react.useState)(false);
	const { resetPassword } = useAuthStore();
	const { toast } = useToast();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			await resetPassword(email);
			setIsSuccess(true);
			toast({
				title: "E-mail enviado",
				description: "Se houver uma conta associada a este e-mail, você receberá um link para redefinir sua senha em breve."
			});
		} catch (err) {
			toast({
				title: "Erro",
				description: err.message || "Ocorreu um erro ao tentar enviar o e-mail de recuperação.",
				variant: "destructive"
			});
		} finally {
			setIsSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/ForgotPassword.tsx:40:5",
		"data-prohibitions": "[editContent]",
		className: "min-h-[80vh] flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/ForgotPassword.tsx:41:7",
			"data-prohibitions": "[editContent]",
			className: "w-full max-w-md space-y-8 bg-[#111111]/80 p-8 rounded-2xl border border-[#333333] shadow-elevation animate-in fade-in duration-500",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ForgotPassword.tsx:42:9",
				"data-prohibitions": "[]",
				className: "space-y-2 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/ForgotPassword.tsx:43:11",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold font-display tracking-tight",
					children: "Recuperar Senha"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/ForgotPassword.tsx:44:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Digite seu e-mail para receber um link de redefinição"
				})]
			}), isSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ForgotPassword.tsx:50:11",
				"data-prohibitions": "[]",
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/ForgotPassword.tsx:51:13",
					"data-prohibitions": "[]",
					className: "p-4 bg-primary/10 border border-primary/20 rounded-[8px] text-primary text-center",
					children: "E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/ForgotPassword.tsx:54:13",
					"data-prohibitions": "[]",
					asChild: true,
					className: "w-full h-12 text-base",
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-uid": "src/pages/ForgotPassword.tsx:55:15",
						"data-prohibitions": "[]",
						to: "/login",
						children: "Voltar ao login"
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-uid": "src/pages/ForgotPassword.tsx:59:11",
				"data-prohibitions": "[editContent]",
				onSubmit: handleSubmit,
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/ForgotPassword.tsx:60:13",
						"data-prohibitions": "[]",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/ForgotPassword.tsx:61:15",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/ForgotPassword.tsx:62:17",
								"data-prohibitions": "[]",
								htmlFor: "email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/ForgotPassword.tsx:63:17",
								"data-prohibitions": "[editContent]",
								id: "email",
								type: "email",
								placeholder: "nome@exemplo.com",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								required: true
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/ForgotPassword.tsx:74:13",
						"data-prohibitions": "[editContent]",
						type: "submit",
						className: "w-full h-12 text-base",
						disabled: isSubmitting,
						children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							"data-uid": "src/pages/ForgotPassword.tsx:75:31",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 animate-spin mr-2"
						}) : null, "Enviar link de redefinição"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/ForgotPassword.tsx:79:13",
						"data-prohibitions": "[]",
						className: "text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							"data-uid": "src/pages/ForgotPassword.tsx:80:15",
							"data-prohibitions": "[]",
							to: "/login",
							className: "text-sm text-muted-foreground hover:text-foreground inline-flex items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
								"data-uid": "src/pages/ForgotPassword.tsx:84:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), "Voltar ao login"]
						})
					})
				]
			})]
		})
	});
}
export { ForgotPassword as default };

//# sourceMappingURL=ForgotPassword-BWiGjZ8h.js.map