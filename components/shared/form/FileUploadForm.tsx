// "use client";

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// const fileFormSchema = z.object({
//   file: "",
// });

// const PasteTextForm = () => {
//   const form = useForm<z.infer<typeof fileFormSchema>>({
//     resolver: zodResolver(fileFormSchema),
//     defaultValues: {
//       file: "",
//     },
//   });

//   function onSubmit(values: z.infer<typeof fileFormSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values);
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex flex-col gap-6"
//       >
//         <FormField
//           control={form.control}
//           name="file"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="paragraph-semibold text-dark-400">
//                 Paste your notes. Let AI do the rest.{" "}
//                 <span className="text-orange-500">*</span>
//               </FormLabel>
//               <FormControl>
//                 <Input type="file" />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {/* <FormField
//           control={form.control}
//           name="numberOfTerms"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="paragraph-semibold text-dark-400">
//                 Number of questions
//               </FormLabel>
//               <FormControl>
//                 <Input type="number" {...field} />
//               </FormControl>
              
//               <FormMessage />
//             </FormItem>
//           )}
//         /> */}
//         <Button
//           variant={"outline"}
//           className="mt-6 w-[300px] self-center border-2 border-black hover:border-primary-500"
//           type="submit"
//         >
//           Generate study set
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default PasteTextForm;
