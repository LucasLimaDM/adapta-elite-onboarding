import { t as LoaderCircle } from "./loader-circle-Bahjpv76.js";
import { A as require_react, D as useLocation, E as Link, O as useNavigate, S as require_jsx_runtime, T as useToast, j as __toESM, r as useAuthStore, t as Button } from "./index-evE1m07u.js";
import { r as Input, t as Label } from "./label-CyA0Rwal.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function Login() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const { login } = useAuthStore();
	const navigate = useNavigate();
	const location = useLocation();
	const { toast } = useToast();
	const from = location.state?.from?.pathname || "/";
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			await login(email, password);
			navigate(from, { replace: true });
		} catch (err) {
			toast({
				title: "Erro no login",
				description: err.message || "Credenciais inválidas. Tente novamente.",
				variant: "destructive"
			});
		} finally {
			setIsSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/Login.tsx:39:5",
		"data-prohibitions": "[editContent]",
		className: "min-h-[80vh] flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/Login.tsx:40:7",
			"data-prohibitions": "[editContent]",
			className: "w-full max-w-md space-y-8 bg-[#111111]/80 p-8 rounded-2xl border border-[#333333] shadow-elevation animate-in fade-in duration-500",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Login.tsx:41:9",
					"data-prohibitions": "[]",
					className: "space-y-2 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Login.tsx:42:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold font-display tracking-tight",
						children: "Bem-vindo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Login.tsx:43:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Faça login para continuar"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					"data-uid": "src/pages/Login.tsx:46:9",
					"data-prohibitions": "[editContent]",
					onSubmit: handleSubmit,
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Login.tsx:47:11",
						"data-prohibitions": "[]",
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Login.tsx:48:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/Login.tsx:49:15",
								"data-prohibitions": "[]",
								htmlFor: "email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/Login.tsx:50:15",
								"data-prohibitions": "[editContent]",
								id: "email",
								type: "email",
								placeholder: "nome@exemplo.com",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								required: true
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Login.tsx:59:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Login.tsx:60:15",
								"data-prohibitions": "[]",
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/Login.tsx:61:17",
									"data-prohibitions": "[]",
									htmlFor: "password",
									children: "Senha"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									"data-uid": "src/pages/Login.tsx:62:17",
									"data-prohibitions": "[]",
									to: "/forgot-password",
									className: "text-sm font-medium text-primary hover:underline",
									children: "Esqueceu a senha?"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/Login.tsx:69:15",
								"data-prohibitions": "[editContent]",
								id: "password",
								type: "password",
								placeholder: "••••••••",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								required: true
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Login.tsx:80:11",
						"data-prohibitions": "[editContent]",
						type: "submit",
						className: "w-full h-12 text-base",
						disabled: isSubmitting,
						children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							"data-uid": "src/pages/Login.tsx:81:29",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 animate-spin mr-2"
						}) : null, "Entrar"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Login.tsx:86:9",
					"data-prohibitions": "[]",
					className: "text-center text-sm text-muted-foreground",
					children: [
						"Não tem uma conta?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-uid": "src/pages/Login.tsx:88:11",
							"data-prohibitions": "[]",
							to: "/signup",
							className: "text-primary hover:underline font-medium",
							children: "Criar conta"
						})
					]
				})
			]
		})
	});
}
export { Login as default };

//# sourceMappingURL=Login-Dy6TgW1o.js.map