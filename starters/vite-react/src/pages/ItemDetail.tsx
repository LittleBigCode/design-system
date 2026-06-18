import { useParams, useNavigate } from "react-router-dom";
import {
  PageHeader,
  Breadcrumb,
  Button,
  Card,
  DescriptionList,
  Tag,
} from "@diametral/design-system/react";

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Items", href: "/items" },
              { label: `Item ${id}` },
            ]}
          />
        }
        title={`Item ${id}`}
        subtitle="Detail view reached from the grid."
        actions={
          <Button onClick={() => navigate("/items")}>Back to items</Button>
        }
      />

      <Card title="Properties">
        <DescriptionList
          items={[
            { term: "ID", desc: id },
            { term: "Owner", desc: "Vincent" },
            { term: "Status", desc: <Tag status="success">active</Tag> },
            { term: "Created", desc: "2026-01-04" },
            { term: "Updated", desc: "2026-06-18" },
          ]}
        />
      </Card>
    </>
  );
}
