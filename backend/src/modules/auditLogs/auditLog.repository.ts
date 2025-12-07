import { prisma } from "../../core/lib/prisma";
import { IAuditLogDto } from "./dtos/auditLogDto";

export class AuditLogRepository {
  log = async (data: IAuditLogDto) => {
    await prisma.auditLog.create({
      data: {
        ...data,
      },
    });
  };
}
