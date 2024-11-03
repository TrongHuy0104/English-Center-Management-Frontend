import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRoleUser, updateUserProfile } from '../../../services/apiUser';

export const useUserProfile = (userId) => {
    const queryClient = useQueryClient();
  
    // Fetch user profile data
    const { data, isLoading, error } = useQuery({
      queryKey: ['userProfile', userId],
      queryFn: () => getRoleUser(userId),
      enabled: !!userId,
    });
  
    // Mutation for updating user profile
    const mutation = useMutation({
      mutationFn: (updatedData) => updateUserProfile(userId, updatedData),
      onSuccess: () => {
        queryClient.invalidateQueries(['userProfile', userId]); // Refresh the data
      },
    });
    console.log(data);
    
    return {
      profileData: data,
      isLoading,
      error,
      updateProfile: mutation.mutateAsync,
      updateStatus: mutation.status,
    };
  };