export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    try {
        const { userId, metrics } = req.body;

        if (!userId || !metrics) {
            return res.status(400).json({ error: "Parâmetros inválidos" });
        }

        // Aqui você pode salvar no banco de dados (ex: MongoDB, PostgreSQL, Firebase)
        console.log(`Recebendo métricas para usuário ${userId}`, metrics);

        return res.status(200).json({ message: "Métricas recebidas com sucesso" });
    } catch (error) {
        console.error("Erro ao processar métricas:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
}
