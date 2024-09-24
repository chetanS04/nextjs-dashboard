'use server';


import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


// import { State } from '@/app/lib/actions';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';




export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

// Define the state type for form actions
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// Define the form schema
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string().min(1, {
    message: 'Please select a customer.',
  }),
  amount: z.coerce.number().gt(0, {
    message: 'Please enter an amount greater than $0.',
  }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

// CreateInvoice schema excluding id and date
const CreateInvoice = FormSchema.omit({ id: true, date: true });

// Function to update an invoice
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = FormSchema.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
    id, // Include id for validation
    date: new Date().toISOString(), // You can adjust this as necessary
  });

  const amountInCents = amount * 100;

 
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
 


  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Function to create an invoice
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Function to delete an invoice
export async function deleteInvoice(id: string) {

    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
}

