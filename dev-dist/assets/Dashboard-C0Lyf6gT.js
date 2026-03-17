import { t as LoaderCircle } from "./loader-circle-D_HlnIXX.js";
import { A as require_react, S as require_jsx_runtime, c as LogOut, j as __toESM, o as cn, r as useAuthStore, t as Button, u as createLucideIcon } from "./index-D4M8p4AW.js";
import { t as getSubmissions } from "./api-CpE6hUO2.js";
var LayoutDashboard = createLucideIcon("layout-dashboard", [
	["rect", {
		width: "7",
		height: "9",
		x: "3",
		y: "3",
		rx: "1",
		key: "10lvy0"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "14",
		y: "3",
		rx: "1",
		key: "16une8"
	}],
	["rect", {
		width: "7",
		height: "9",
		x: "14",
		y: "12",
		rx: "1",
		key: "1hutg5"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "3",
		y: "16",
		rx: "1",
		key: "ldoo1y"
	}]
]);
var ShieldAlert = createLucideIcon("shield-alert", [
	["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}],
	["path", {
		d: "M12 8v4",
		key: "1got3b"
	}],
	["path", {
		d: "M12 16h.01",
		key: "1drbdi"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/card.tsx:7:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("rounded-2xl border border-border bg-card text-card-foreground shadow-elevation transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/card.tsx:21:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/card.tsx:28:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-2xl font-semibold leading-none tracking-tight font-display", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/card.tsx:39:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/card.tsx:46:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/card.tsx:53:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
var Table = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/table.tsx:8:5",
	"data-prohibitions": "[editContent]",
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		"data-uid": "src/components/ui/table.tsx:9:7",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
	"data-uid": "src/components/ui/table.tsx:19:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
	"data-uid": "src/components/ui/table.tsx:27:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
	"data-uid": "src/components/ui/table.tsx:35:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}));
TableFooter.displayName = "TableFooter";
var TableRow = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
	"data-uid": "src/components/ui/table.tsx:45:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
	"data-uid": "src/components/ui/table.tsx:61:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	"data-uid": "src/components/ui/table.tsx:76:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
	...props
}));
TableCell.displayName = "TableCell";
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
	"data-uid": "src/components/ui/table.tsx:88:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}));
TableCaption.displayName = "TableCaption";
function Dashboard() {
	const { user, isLoading: isAuthLoading, logout } = useAuthStore();
	const [data, setData] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		const fetchSubmissions = async () => {
			setIsLoading(true);
			try {
				setData(await getSubmissions(user.email) || []);
			} catch (error) {
				setData([]);
			} finally {
				setIsLoading(false);
			}
		};
		fetchSubmissions();
	}, [user]);
	if (isAuthLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/Dashboard.tsx:41:7",
		"data-prohibitions": "[]",
		className: "min-h-screen flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			"data-uid": "src/pages/Dashboard.tsx:42:9",
			"data-prohibitions": "[editContent]",
			className: "w-8 h-8 animate-spin text-primary"
		})
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Dashboard.tsx:49:7",
		"data-prohibitions": "[]",
		className: "min-h-screen p-8 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Dashboard.tsx:50:9",
				"data-prohibitions": "[]",
				className: "w-16 h-16 bg-[#111111] text-muted-foreground border border-[#333333] rounded-full flex items-center justify-center mb-2 shadow-elevation",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
					"data-uid": "src/pages/Dashboard.tsx:51:11",
					"data-prohibitions": "[editContent]",
					className: "w-8 h-8"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/Dashboard.tsx:53:9",
				"data-prohibitions": "[]",
				className: "text-2xl font-display font-bold",
				children: "Acesso Restrito"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/Dashboard.tsx:54:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground max-w-md text-center",
				children: "Esta área é restrita para administradores. Acesse utilizando o link seguro enviado para o seu email."
			})
		]
	});
	const isAuthorized = user.email.endsWith("@adapta.org");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Dashboard.tsx:65:5",
		"data-prohibitions": "[editContent]",
		className: "min-h-screen p-4 md:p-8 animate-in fade-in duration-500 max-w-6xl mx-auto space-y-8 pt-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/Dashboard.tsx:66:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#111111]/50 p-6 rounded-2xl border border-[#333333] shadow-elevation",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Dashboard.tsx:67:9",
				"data-prohibitions": "[]",
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Dashboard.tsx:68:11",
					"data-prohibitions": "[]",
					className: "w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-[8px] flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, {
						"data-uid": "src/pages/Dashboard.tsx:69:13",
						"data-prohibitions": "[editContent]",
						className: "w-6 h-6"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Dashboard.tsx:71:11",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Dashboard.tsx:72:13",
						"data-prohibitions": "[]",
						className: "text-2xl font-display font-bold",
						children: "Dashboard Admin"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Dashboard.tsx:73:13",
						"data-prohibitions": "[]",
						className: "text-muted-foreground text-sm",
						children: "Gerenciamento de submissões de clientes."
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Dashboard.tsx:78:9",
				"data-prohibitions": "[editContent]",
				className: "flex items-center gap-4 w-full sm:w-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Dashboard.tsx:79:11",
					"data-prohibitions": "[editContent]",
					className: "text-sm text-muted-foreground flex-1 sm:flex-none text-right sm:text-left",
					children: ["Logado como: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/pages/Dashboard.tsx:80:26",
						"data-prohibitions": "[editContent]",
						className: "text-foreground font-medium",
						children: user.email
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/Dashboard.tsx:82:11",
					"data-prohibitions": "[]",
					variant: "outline",
					onClick: logout,
					size: "icon",
					title: "Sair",
					className: "shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
						"data-uid": "src/pages/Dashboard.tsx:83:13",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4"
					})
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/pages/Dashboard.tsx:88:7",
			"data-prohibitions": "[editContent]",
			className: "bg-[#111111]/80 border-[#333333] shadow-elevation overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				"data-uid": "src/pages/Dashboard.tsx:89:9",
				"data-prohibitions": "[]",
				className: "border-b border-[#333333] bg-[#0C0C0D]/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					"data-uid": "src/pages/Dashboard.tsx:90:11",
					"data-prohibitions": "[]",
					children: "Submissões Recentes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
					"data-uid": "src/pages/Dashboard.tsx:91:11",
					"data-prohibitions": "[]",
					children: "Resultados do pré-onboarding de clientes de alto padrão."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				"data-uid": "src/pages/Dashboard.tsx:95:9",
				"data-prohibitions": "[editContent]",
				className: "p-0",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Dashboard.tsx:97:13",
					"data-prohibitions": "[]",
					className: "flex flex-col items-center justify-center p-16 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						"data-uid": "src/pages/Dashboard.tsx:98:15",
						"data-prohibitions": "[editContent]",
						className: "w-8 h-8 animate-spin text-primary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Dashboard.tsx:99:15",
						"data-prohibitions": "[]",
						className: "text-sm text-muted-foreground",
						children: "Carregando dados..."
					})]
				}) : !isAuthorized || data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Dashboard.tsx:102:13",
					"data-prohibitions": "[editContent]",
					className: "text-center p-16 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Dashboard.tsx:103:15",
						"data-prohibitions": "[]",
						className: "text-muted-foreground text-lg",
						children: "Nenhum dado disponível para exibição."
					}), !isAuthorized && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Dashboard.tsx:105:17",
						"data-prohibitions": "[]",
						className: "text-sm text-destructive bg-destructive/10 inline-block px-3 py-1 rounded-full border border-destructive/20",
						children: "Acesso negado: Domínio de email não autorizado."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Dashboard.tsx:111:13",
					"data-prohibitions": "[editContent]",
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/Dashboard.tsx:112:15",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/pages/Dashboard.tsx:113:17",
							"data-prohibitions": "[]",
							className: "bg-[#0C0C0D]/80",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Dashboard.tsx:114:19",
								"data-prohibitions": "[]",
								className: "border-[#333333] hover:bg-transparent",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Dashboard.tsx:115:21",
										"data-prohibitions": "[]",
										className: "w-[200px]",
										children: "Nome"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Dashboard.tsx:116:21",
										"data-prohibitions": "[]",
										children: "Email"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Dashboard.tsx:117:21",
										"data-prohibitions": "[]",
										children: "Profissão"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Dashboard.tsx:118:21",
										"data-prohibitions": "[]",
										children: "Portfólio"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Dashboard.tsx:119:21",
										"data-prohibitions": "[]",
										children: "Risco"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Dashboard.tsx:120:21",
										"data-prohibitions": "[]",
										className: "text-center",
										children: "VSL"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
							"data-uid": "src/pages/Dashboard.tsx:123:17",
							"data-prohibitions": "[editContent]",
							children: data.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Dashboard.tsx:125:21",
								"data-prohibitions": "[editContent]",
								className: "border-[#333333] hover:bg-[#222222]/50 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Dashboard.tsx:129:23",
										"data-prohibitions": "[editContent]",
										className: "font-medium text-foreground",
										children: item.name || "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Dashboard.tsx:132:23",
										"data-prohibitions": "[editContent]",
										className: "text-muted-foreground",
										children: item.email
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Dashboard.tsx:133:23",
										"data-prohibitions": "[editContent]",
										children: item.profession || "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Dashboard.tsx:134:23",
										"data-prohibitions": "[editContent]",
										children: item.portfolio || "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Dashboard.tsx:135:23",
										"data-prohibitions": "[editContent]",
										children: item.risk || "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Dashboard.tsx:136:23",
										"data-prohibitions": "[editContent]",
										className: "text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/Dashboard.tsx:137:25",
											"data-prohibitions": "[editContent]",
											className: `inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium ${item.vsl_watched ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"}`,
											children: item.vsl_watched ? "Assistido" : "Pendente"
										})
									})
								]
							}, item.id || index))
						})]
					})
				})
			})]
		})]
	});
}
export { Dashboard as default };

//# sourceMappingURL=Dashboard-C0Lyf6gT.js.map