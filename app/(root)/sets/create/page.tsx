import React from 'react';

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CustomFileInput from '@/components/shared/formcomponents/CustomFileInput';
import PasteTextForm from '@/components/shared/form/PasteTextForm';

import { createClient } from '@/lib/supabase/server';
// import { redirect } from 'next/navigation';

const CreatePage = async () => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // if (!user) redirect("/login");
  const userId = user?.id;

  return (
    <main className="relative flex justify-center">
      <Tabs defaultValue="paste" className="flex w-full flex-col justify-center">
      <TabsList>
        <TabsTrigger value="paste" className="w-96 focus:border-2">
          Paste Notes
        </TabsTrigger>
        <TabsTrigger value="file" className="w-96 focus:border-2">
          Add a File
        </TabsTrigger>
      </TabsList>
      <TabsContent value="paste">
        <PasteTextForm userId={userId} />
      </TabsContent>
      <TabsContent value="file">
        <Card className="mb-6 py-5 text-center">Attach a file</Card>
        <CustomFileInput />
      </TabsContent>
    </Tabs>
    </main>
  );
};

export default CreatePage;
