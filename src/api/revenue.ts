export async function updateTransaction(id: number, data: any) {
  try {
    const response = await fetch(`/api/revenue/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update transaction');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
}

export async function deleteTransaction(id: number) {
  try {
    const response = await fetch(`/api/revenue/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete transaction');
    }

    return true;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
}