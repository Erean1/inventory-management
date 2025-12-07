import { AuditLogRepository } from "./auditLog.repository";
import { AuditLogService } from "./auditLog.service";

const auditLogRepository = new AuditLogRepository()
export const auditLogService = new AuditLogService(auditLogRepository)