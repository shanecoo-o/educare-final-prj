import { FileText } from 'lucide-react';
import { PaymentStatusBadge, type PaymentStatus } from './PaymentStatusBadge';

interface InvoiceCardProps {
  id: string;
  concept: string;
  amount: string;
  dueDate: string;
  status: PaymentStatus;
  student?: string;
}

export function InvoiceCard({ id, concept, amount, dueDate, status, student }: InvoiceCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3.5 transition-all hover:shadow-sm hover:border-primary/10">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
        <FileText className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{concept}</p>
        <p className="text-xs text-muted-foreground">
          {id} · Due {dueDate}{student && ` · ${student}`}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-heading text-sm font-bold text-foreground">{amount}</span>
        <PaymentStatusBadge status={status} />
      </div>
    </div>
  );
}
