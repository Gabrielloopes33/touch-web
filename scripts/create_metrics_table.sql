-- Script SQL para criar a tabela de métricas no PostgreSQL
-- Execute este script no seu banco PostgreSQL na VPS

-- Criar tabela principal de métricas
CREATE TABLE IF NOT EXISTS metrics (
    id SERIAL PRIMARY KEY,
    client_id VARCHAR(255) NOT NULL,
    campaign_id VARCHAR(255) NOT NULL,
    ad_id VARCHAR(255) NOT NULL,
    reach BIGINT DEFAULT 0,
    impressions BIGINT DEFAULT 0,
    clicks BIGINT DEFAULT 0,
    spend DECIMAL(10,2) DEFAULT 0,
    ctr_click DECIMAL(5,2) DEFAULT 0, -- CTR do click (%)
    cpc DECIMAL(8,2) DEFAULT 0,
    cvr DECIMAL(5,2) DEFAULT 0,        -- Taxa de conversão (%)
    cpl DECIMAL(8,2) DEFAULT 0,        -- Custo por lead
    frequency DECIMAL(5,2) DEFAULT 0,  -- Frequência média
    roas DECIMAL(8,2) DEFAULT 0,       -- Return on Ad Spend
    quality_score INTEGER DEFAULT 0,   -- Índice de qualidade (0-10)
    date_recorded DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_metrics_client_id ON metrics(client_id);
CREATE INDEX IF NOT EXISTS idx_metrics_campaign_id ON metrics(campaign_id);
CREATE INDEX IF NOT EXISTS idx_metrics_date_recorded ON metrics(date_recorded);
CREATE INDEX IF NOT EXISTS idx_metrics_client_date ON metrics(client_id, date_recorded);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at automaticamente
DROP TRIGGER IF EXISTS update_metrics_updated_at ON metrics;
CREATE TRIGGER update_metrics_updated_at
    BEFORE UPDATE ON metrics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Comentários para documentação
COMMENT ON TABLE metrics IS 'Tabela principal para armazenar métricas de campanhas de Meta Ads';
COMMENT ON COLUMN metrics.client_id IS 'Identificador do cliente';
COMMENT ON COLUMN metrics.campaign_id IS 'Identificador da campanha';
COMMENT ON COLUMN metrics.ad_id IS 'Identificador do anúncio';
COMMENT ON COLUMN metrics.reach IS 'Alcance total';
COMMENT ON COLUMN metrics.impressions IS 'Número de impressões';
COMMENT ON COLUMN metrics.clicks IS 'Número de cliques';
COMMENT ON COLUMN metrics.spend IS 'Valor gasto em reais';
COMMENT ON COLUMN metrics.ctr_click IS 'CTR do click em porcentagem';
COMMENT ON COLUMN metrics.cpc IS 'Custo por clique em reais';
COMMENT ON COLUMN metrics.cvr IS 'Taxa de conversão em porcentagem';
COMMENT ON COLUMN metrics.cpl IS 'Custo por lead em reais';
COMMENT ON COLUMN metrics.frequency IS 'Frequência média de exibição';
COMMENT ON COLUMN metrics.roas IS 'Return on Ad Spend (retorno sobre investimento)';
COMMENT ON COLUMN metrics.quality_score IS 'Índice de qualidade do anúncio (0-10)';
COMMENT ON COLUMN metrics.date_recorded IS 'Data de registro da métrica';