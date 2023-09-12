"use client";
import { Billboard, Category, Store } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Store as StoreIcon, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";

const formShema = z.object({
  name: z.string().min(2),
  billboardId: z.string().min(1),
});

type CategoryValueProps = z.infer<typeof formShema>;

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[];
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards,
}) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Category " : "Create Category";
  const description = initialData ? "Edit Category " : "Add a new Category";
  const toastMessage = initialData ? "Category Updated " : "Category Created";
  const action = initialData ? "Save Changes " : "Create ";

  const form = useForm<CategoryValueProps>({
    resolver: zodResolver(formShema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });

  console.log(initialData);

  const onSubmit = async (data: CategoryValueProps) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/categories/${params.category}`
      );
      router.refresh();
      router.push("/");
      toast.success("Store Deleted");
    } catch (error) {
      toast.error("Make sure you removed all categories ");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={() => {
          onDelete();
        }}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description}></Heading>
        {initialData && (
          <Button
            variant={"destructive"}
            size={"icon"}
            disabled={loading}
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={`Category name`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};
