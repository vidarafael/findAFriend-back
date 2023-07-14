import { OrganizationDTO } from '@/dtos/organization-dto';
import { OrganizationRepository } from '../../repositories/organization-repository';
import { hash } from 'bcryptjs';
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error';

type CreateOrganizationUseCaseRequest = Omit<OrganizationDTO, 'id' | 'created_at' | 'password_hash'> & { password: string }

interface CreateOrganizationUseCaseResponse {
  organization: OrganizationDTO
}


class CreateOrganizationUseCase {
  constructor (private organizationRepository: OrganizationRepository) {}

  async execute({ name, phone, latitude, longitude, email, password, city, state }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const organizationAlreadyExists = await this.organizationRepository.findByEmail({
      email
    })

    if (organizationAlreadyExists) {
      throw new OrganizationAlreadyExistsError()
    }
    
    const password_hash = await hash(password, 6)

    const organization = await this.organizationRepository.create({
      name, phone, latitude, longitude, email, password_hash, city, state
    })

    return {
      organization
    }
  }
}

export { CreateOrganizationUseCase }