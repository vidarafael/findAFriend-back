-- AlterTable
ALTER TABLE "adoption_animal" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "wasAdopted" TIMESTAMP(3);
