import { E as useLocation, O as require_react, T as Link, k as __toESM, l as createLucideIcon, t as Button, x as require_jsx_runtime } from "./index-B2FgPP9s.js";
var House = createLucideIcon("house", [["path", {
	d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
	key: "5wwlr5"
}], ["path", {
	d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
	key: "r6nss1"
}]]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var NotFound = () => {
	const location = useLocation();
	(0, import_react.useEffect)(() => {
		console.error("404 Error: User attempted to access non-existent route:", location.pathname);
	}, [location.pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/NotFound.tsx:14:5",
		"data-prohibitions": "[]",
		className: "min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/NotFound.tsx:15:7",
			"data-prohibitions": "[]",
			className: "bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center space-y-4 animate-fade-in-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/NotFound.tsx:16:9",
					"data-prohibitions": "[]",
					className: "text-6xl font-bold text-primary mb-2",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-uid": "src/pages/NotFound.tsx:17:9",
					"data-prohibitions": "[]",
					className: "text-2xl font-semibold text-slate-900",
					children: "Página não encontrada"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/NotFound.tsx:18:9",
					"data-prohibitions": "[]",
					className: "text-lg text-slate-600 pb-4",
					children: "A página que você está procurando não existe ou foi movida."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/NotFound.tsx:21:9",
					"data-prohibitions": "[]",
					asChild: true,
					className: "w-full h-12 text-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						"data-uid": "src/pages/NotFound.tsx:22:11",
						"data-prohibitions": "[]",
						to: "/",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
							"data-uid": "src/pages/NotFound.tsx:23:13",
							"data-prohibitions": "[editContent]",
							className: "mr-2 h-5 w-5"
						}), "Voltar para o Início"]
					})
				})
			]
		})
	});
};
var NotFound_default = NotFound;
export { NotFound_default as default };

//# sourceMappingURL=NotFound-BUF1GcGK.js.map