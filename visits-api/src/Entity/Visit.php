<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\VisitRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: VisitRepository::class)]
#[ApiResource(normalizationContext: ['groups'=>['visit']])]
class Visit
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('visit')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('visit')]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    #[Groups('visit')]
    private ?string $lastname = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups('visit')]
    private ?\DateTimeInterface $entranceDate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups('visit')]
    private ?\DateTimeInterface $leavingDate = null;

    #[ORM\ManyToOne(inversedBy: 'visits')]
    #[Groups('visit')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Employee $encouteredPerson = null;

    #[ORM\ManyToOne(inversedBy: 'visits')]
    #[Groups('visit')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Reason $reason = null;

    #[ORM\Column(length: 255)]
    #[Groups('visit')]
    private ?string $company = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getEntranceDate(): ?\DateTimeInterface
    {
        return $this->entranceDate;
    }

    public function setEntranceDate(\DateTimeInterface $entranceDate): self
    {
        $this->entranceDate = $entranceDate;

        return $this;
    }

    public function getLeavingDate(): ?\DateTimeInterface
    {
        return $this->leavingDate;
    }

    public function setLeavingDate(?\DateTimeInterface $leavingDate): self
    {
        $this->leavingDate = $leavingDate;

        return $this;
    }

    public function getEncouteredPerson(): ?Employee
    {
        return $this->encouteredPerson;
    }

    public function setEncouteredPerson(?Employee $encouteredPerson): self
    {
        $this->encouteredPerson = $encouteredPerson;

        return $this;
    }

    public function getReason(): ?Reason
    {
        return $this->reason;
    }

    public function setReason(?Reason $reason): self
    {
        $this->reason = $reason;

        return $this;
    }

    public function getSignature()
    {
        return (string) $this->signature;
    }


    public function setSignature($signature): self
    {
        $this->signature = $signature;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(string $company): self
    {
        $this->company = $company;

        return $this;
    }
}
