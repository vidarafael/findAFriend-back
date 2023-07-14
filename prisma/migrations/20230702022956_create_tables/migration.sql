-- CreateEnum
CREATE TYPE "Size" AS ENUM ('PEQUENO', 'MEDIO', 'GRANDE');

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adoption_animal" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "animal_id" TEXT NOT NULL,

    CONSTRAINT "adoption_animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animals" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "age_in_month" INTEGER NOT NULL DEFAULT 0,
    "type_animal" TEXT NOT NULL,
    "size" "Size" NOT NULL DEFAULT 'PEQUENO',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adoption_animal_animal_id_key" ON "adoption_animal"("animal_id");

-- AddForeignKey
ALTER TABLE "adoption_animal" ADD CONSTRAINT "adoption_animal_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoption_animal" ADD CONSTRAINT "adoption_animal_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
