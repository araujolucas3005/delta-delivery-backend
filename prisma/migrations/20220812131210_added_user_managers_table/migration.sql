-- CreateTable
CREATE TABLE "user_managers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_managers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_managers_login_key" ON "user_managers"("login");
