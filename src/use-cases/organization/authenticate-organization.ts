import { OrganizationDTO } from '@/dtos/organization-dto';
import { OrganizationRepository } from '../../repositories/organization-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { compare } from 'bcryptjs';

type AuthenticateOrganizationUseCaseRequest = { email: string, password: string }

interface AuthenticateOrganizationUseCaseResponse {
  organization: OrganizationDTO
}


class AuthenticateOrganizationUseCase {
  constructor (private organizationRepository: OrganizationRepository) {}

  async execute({ email, password }: AuthenticateOrganizationUseCaseRequest): Promise<AuthenticateOrganizationUseCaseResponse> {
    const organization = await this.organizationRepository.findByEmail({
      email
    })

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const isValidPassword = await compare(password, organization.password_hash)

    if (!isValidPassword) {
      throw new InvalidCredentialsError()
    }

    return {
      organization
    }
  }
}

export { AuthenticateOrganizationUseCase }