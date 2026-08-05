import { useState } from 'react';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Card, {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/Card.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import ErrorState from '../components/ui/ErrorState.jsx';
import Input from '../components/ui/Input.jsx';
import Modal from '../components/ui/Modal.jsx';
import Skeleton from '../components/ui/Skeleton.jsx';
import Spinner from '../components/ui/Spinner.jsx';

function UiPreview() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="page-container space-y-8">
        <header>
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            UI system
          </p>
          <h1 className="section-heading mt-2">Component preview</h1>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Buttons and badges</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button loading>Loading</Button>
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Form controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Email"
                placeholder="you@example.com"
                helperText="Helper text"
              />
              <Input
                label="Invalid field"
                error="Vui long kiem tra gia tri nay."
                defaultValue="Sai gia tri"
              />
              <Input
                label="Disabled field"
                disabled
                value="Khong the chinh sua"
                readOnly
              />
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => setModalOpen(true)}>
                Open modal
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loading and states</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted">
                <Spinner size="sm" /> Loading data
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <EmptyState
                title="Chua co san pham"
                description="Danh sach se hien thi khi co du lieu."
                action={<Button variant="outline">Them san pham</Button>}
              />
              <ErrorState
                message="Khong the tai du lieu."
                action={<Button variant="outline">Thu lai</Button>}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Modal example"
      >
        <p className="text-sm text-muted">
          Noi dung modal co the duoc truyen tu page.
        </p>
      </Modal>
    </main>
  );
}

export default UiPreview;
