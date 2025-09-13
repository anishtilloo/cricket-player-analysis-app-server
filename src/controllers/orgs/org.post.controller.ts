import { Request, Response } from 'express'; 
import httpStatus from 'http-status';
import addOrg from '../../services/orgs/org.post.services';
import createUser from '../../services/users/user.post.services';
import getOrg from '../../services/orgs/org.get.services';
import { Organization, RoleEnumType } from '@prisma/client';


// POST request
// create new org in the DB 
export async function addOrganization(req: Request , res: Response) {
    try {
        const org = req.body as Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>;
        
        const checkIfOrgExists = await getOrg(org.email);

        if(checkIfOrgExists) {
            return res.status(httpStatus.BAD_REQUEST).json({ 
                success: false, 
                message: "Organization with this email already exists, either enter a different email or try using your official email id", 
                data: null 
            });
        }
        
        // Create organization
        const result = await addOrg(org);

        // Create admin user for the organization
        await createUser({
            email: org.email,
            name: org.ownerName,
            password: 'ChangeMe123!', // Default password, should be changed by user
            organizationId: BigInt(result.id),
            playerId: null,
            role: RoleEnumType.ADMIN,
            isEmailVerified: false
        });

        // Send Email to the user to verify their email and change password - TODO
        // sendEmailVerification(org.email);

        res.status(httpStatus.CREATED).json({ 
            success: true, 
            message: "Org Added Successfully, and admin user created please check your email for verification", 
            data: result 
        })
    } catch (error: any) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ 
            success: false, 
            message: error.message || "Something went wrong", 
            error: error 
        })
    }
}