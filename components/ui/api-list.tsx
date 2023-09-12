"use client";
import { useOrigin } from "@/hooks/use-origin";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
  entityName: string;
  entitityIdName: string;
}

const ApiList: React.FC<ApiListProps> = ({ entitityIdName, entityName }) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entitityIdName}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entitityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entitityIdName}}`}
      />
    </>
  );
};

export default ApiList;
