import { AuditLogRepository } from "./auditLog.repository";
import { IAuditLogDto } from "./dtos/auditLogDto";

export class AuditLogService {
    private auditLogRepository : AuditLogRepository
    constructor(auditLogRepository : AuditLogRepository) {
        this.auditLogRepository = auditLogRepository
    }

    createLog = async(data : IAuditLogDto) => {
        return await this.auditLogRepository.log(data)
    }

}