import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    is_doctor: z.boolean()
});
const UsersSchema = z.array(UserSchema);
export type User = z.infer<typeof UserSchema>;

const mockUsers: User[] = [
    {
        id: '1',
        name: 'John Doe',
        is_doctor: false
    },
    {
        id: '2',
        name: 'Jane Doe',
        is_doctor: true
    },
    {
        id: '3',
        name: 'John Smith',
        is_doctor: false
    },
    {
        id: '4',
        name: 'Jane Smith',
        is_doctor: false
    }
];

export const getUsers = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // return mockUsers;

    const response = await axios.get('https://bi-hackathon-back.vercel.app/api/users');
    return UsersSchema.parse(response.data) as User[];
};

export const useUsers = () => {
    const { data, ...rest } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    });

    const patients = data?.filter((user) => !user.is_doctor) ?? [];
    const doctors = data?.filter((user) => user.is_doctor) ?? [];

    return { patients, doctors, data, ...rest };
};

export const getUser = async (id: string) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // return mockUsers;

    // return mockUsers[0];
    if (!id) return undefined;

    const response = await axios.get(`https://bi-hackathon-back.vercel.app/api/user/${id}`);
    return UserSchema.parse(response.data) as User;
};

export const useUser = (id: string) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => getUser(id)
    });
};
