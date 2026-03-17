import { t as LoaderCircle } from "./loader-circle-Bahjpv76.js";
import { A as require_react, E as Link, O as useNavigate, S as require_jsx_runtime, T as useToast, j as __toESM, r as useAuthStore, t as Button } from "./index-evE1m07u.js";
import { r as Input, t as Label } from "./label-CyA0Rwal.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function SignUp() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const { signup } = useAuthStore();
	const navigate = useNavigate();
	const { toast } = useToast();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast({
				title: "Senhas não coincidem",
				description: "Por favor, verifique se as senhas são iguais.",
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
			await signup(email, password);
			navigate("/", { replace: true });
		} catch (err) {
			toast({
				title: "Erro no cadastro",
				description: err.message || "Não foi possível criar a conta.",
				variant: "destructive"
			});
		} finally {
			setIsSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/SignUp.tsx:55:5",
		"data-prohibitions": "[editContent]",
		className: "min-h-[80vh] flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/SignUp.tsx:56:7",
			"data-prohibitions": "[editContent]",
			className: "w-full max-w-md space-y-8 bg-[#111111]/80 p-8 rounded-2xl border border-[#333333] shadow-elevation animate-in fade-in duration-500",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/SignUp.tsx:57:9",
					"data-prohibitions": "[]",
					className: "space-y-2 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/SignUp.tsx:58:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold font-display tracking-tight",
						children: "Criar Conta"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/SignUp.tsx:59:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Preencha os dados abaixo para se cadastrar"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					"data-uid": "src/pages/SignUp.tsx:62:9",
					"data-prohibitions": "[editContent]",
					onSubmit: handleSubmit,
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/SignUp.tsx:63:11",
						"data-prohibitions": "[]",
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/SignUp.tsx:64:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/SignUp.tsx:65:15",
									"data-prohibitions": "[]",
									htmlFor: "email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/SignUp.tsx:66:15",
									"data-prohibitions": "[editContent]",
									id: "email",
									type: "email",
									placeholder: "nome@exemplo.com",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/SignUp.tsx:75:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/SignUp.tsx:76:15",
									"data-prohibitions": "[]",
									htmlFor: "password",
									children: "Senha"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/SignUp.tsx:77:15",
									"data-prohibitions": "[editContent]",
									id: "password",
									type: "password",
									placeholder: "••••••••",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/SignUp.tsx:86:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/SignUp.tsx:87:15",
									"data-prohibitions": "[]",
									htmlFor: "confirmPassword",
									children: "Confirmar Senha"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/SignUp.tsx:88:15",
									"data-prohibitions": "[editContent]",
									id: "confirmPassword",
									type: "password",
									placeholder: "••••••••",
									value: confirmPassword,
									onChange: (e) => setConfirmPassword(e.target.value),
									required: true
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/SignUp.tsx:99:11",
						"data-prohibitions": "[editContent]",
						type: "submit",
						className: "w-full h-12 text-base",
						disabled: isSubmitting,
						children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							"data-uid": "src/pages/SignUp.tsx:100:29",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 animate-spin mr-2"
						}) : null, "Criar Conta"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/SignUp.tsx:105:9",
					"data-prohibitions": "[]",
					className: "text-center text-sm text-muted-foreground",
					children: [
						"Já possui uma conta?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-uid": "src/pages/SignUp.tsx:107:11",
							"data-prohibitions": "[]",
							to: "/login",
							className: "text-primary hover:underline font-medium",
							children: "Fazer login"
						})
					]
				})
			]
		})
	});
}
export { SignUp as default };

//# sourceMappingURL=SignUp-CucLd2En.js.map