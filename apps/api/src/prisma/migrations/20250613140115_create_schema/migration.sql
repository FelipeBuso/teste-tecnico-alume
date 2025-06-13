-- CreateTable
CREATE TABLE "estudante" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estudante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulacao_financiamento" (
    "id" SERIAL NOT NULL,
    "id_estudante" INTEGER NOT NULL,
    "valor_total" DECIMAL(18,2) NOT NULL,
    "quantidade_parcelas" INTEGER NOT NULL,
    "juros_ao_mes" DECIMAL(5,4) NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "simulacao_financiamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "estudante_email_key" ON "estudante"("email");

-- AddForeignKey
ALTER TABLE "simulacao_financiamento" ADD CONSTRAINT "simulacao_financiamento_id_estudante_fkey" FOREIGN KEY ("id_estudante") REFERENCES "estudante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
