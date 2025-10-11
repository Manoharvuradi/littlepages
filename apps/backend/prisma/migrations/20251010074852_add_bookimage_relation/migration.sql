-- CreateTable
CREATE TABLE "public"."BookImage" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "imageId" TEXT NOT NULL,
    "caption" TEXT,
    "name" TEXT,
    "age" TEXT,
    "date" TIMESTAMP(3),
    "tags" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."BookImage" ADD CONSTRAINT "BookImage_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BookImage" ADD CONSTRAINT "BookImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "public"."Images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
