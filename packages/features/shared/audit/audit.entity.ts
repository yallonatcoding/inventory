export interface AuditFields {
  createdAt: Date;
  updatedAt?: Date | null;
  disabledAt?: Date | null;
}

export interface AuditUserFields {
  createdByUserId: string;
  updatedByUserId?: string | null;
  disabledByUserId?: string | null;
}

export type AuditEntity = AuditFields & AuditUserFields;