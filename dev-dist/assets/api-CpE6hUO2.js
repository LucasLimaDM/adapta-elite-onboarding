async function upsertSubmission(data, isFinal = false) {
	if (!data.additionalData.email) return;
	data.additionalData.name, data.additionalData.email, data.profession, data.useCases, data.additionalData.portfolio, data.additionalData.risk, data.additionalData.vslWatched;
	await new Promise((resolve) => setTimeout(resolve, isFinal ? 1e3 : 300));
	return { success: true };
}
async function getSubmissions(userEmail) {
	await new Promise((resolve) => setTimeout(resolve, 800));
	if (userEmail.endsWith("@adapta.org")) return [{
		id: "1",
		name: "João Silva",
		email: "joao.silva@exemplo.com",
		profession: "Empresário",
		portfolio: "R$ 5M - R$ 15M",
		risk: "Moderado",
		vsl_watched: true,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	}, {
		id: "2",
		name: "Maria Oliveira",
		email: "maria.oliveira@exemplo.com",
		profession: "Médico",
		portfolio: "R$ 15M - R$ 50M",
		risk: "Arrojado",
		vsl_watched: false,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	}];
	return [];
}
export { upsertSubmission as n, getSubmissions as t };

//# sourceMappingURL=api-CpE6hUO2.js.map