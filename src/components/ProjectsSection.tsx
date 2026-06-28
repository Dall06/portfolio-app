import React from 'react';
import styled from '@emotion/styled';
import { ExternalLink, GitBranch } from 'lucide-react';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg height={size} width={size} viewBox="0 0 16 16" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

interface Project {
  title: string;
  description: string;
  tags: string[];
  repoUrl: string;
  demoUrl?: string;
  type: 'Public Template' | 'Personal Project' | 'Production App';
}

const projects: Project[] = [
  {
    title: 'base-api',
    description: 'Plantilla modular corporativa en Go (Echo) implementando Arquitectura Hexagonal y Clean Architecture. Incluye logger slog con enmascaramiento automático de credenciales, pool de conexiones PostgreSQL (Bun), brokers NATS y un instalador CLI integrado.',
    tags: ['Go', 'Echo', 'Bun ORM', 'NATS', 'Docker', 'CLI'],
    repoUrl: 'https://github.com/Dall06/base-api',
    type: 'Public Template'
  },
  {
    title: 'go-cleanapi',
    description: 'Plantilla de microservicio REST en Go basada en Clean Architecture (Robert C. Martin). Diseñada para servir como punto de partida desacoplado, rápido de desplegar y 100% testeable.',
    tags: ['Go', 'Clean Architecture', 'REST API', 'Unit Tests'],
    repoUrl: 'https://github.com/Dall06/go-cleanapi',
    type: 'Public Template'
  },
  {
    title: 'cashcoin-system',
    description: 'Sistema financiero completo estilo Fintech: Microservicio de API REST desarrollado en Go junto con una aplicación móvil interactiva desarrollada en Flutter.',
    tags: ['Go', 'Flutter', 'REST API', 'Dart', 'Mobile Dev'],
    repoUrl: 'https://github.com/Dall06/cashcoin-system',
    type: 'Personal Project'
  },
  {
    title: 'Bro Crm (Gym Bro)',
    description: 'Plataforma completa de administración (CRM) para academias deportivas y artísticas. Arquitectura multi-inquilino de base de datos aislada, módulo de pagos con Stripe y alertas automáticas por WhatsApp.',
    tags: ['React.js', 'Go', 'HTML', 'CSS', 'Zustand', 'Stripe'],
    repoUrl: 'https://github.com/Dall06/base-api', // private, linked to base-api
    type: 'Production App'
  },
  {
    title: 'Integraciones APM (Yuno)',
    description: 'Arquitectura y despliegue de integraciones para más de 15 Métodos de Pago Alternativos (APMs) a nivel global (Pix, Adyen, Klarna). Soporte On-Call técnico avanzado bajo estrictos estándares financieros de alta disponibilidad.',
    tags: ['Go', 'Fintech', 'Adyen', 'Klarna', 'Pix', 'Observability'],
    repoUrl: 'https://github.com/Dall06/base-api',
    type: 'Production App'
  }
];

export const ProjectsSection: React.FC = () => {
  return (
    <SectionContainer>
      <SectionTitle>Proyectos y Experiencia</SectionTitle>
      <Grid>
        {projects.map((project, idx) => (
          <ProjectCard key={idx} className="glass-panel" type={project.type}>
            <CardHeader>
              <TypeBadge type={project.type}>{project.type}</TypeBadge>
              <GitBranch size={16} color="var(--text-muted)" />
            </CardHeader>
            <ProjectTitle>{project.title}</ProjectTitle>
            <Description>{project.description}</Description>
            <TagsWrapper>
              {project.tags.map((tag, tIdx) => (
                <Tag key={tIdx}>{tag}</Tag>
              ))}
            </TagsWrapper>
            <CardFooter>
              <FooterLink href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <GithubIcon size={14} />
                <span>Ver Proyecto</span>
              </FooterLink>
              {project.demoUrl && (
                <FooterLink href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={14} />
                  <span>Live Demo</span>
                </FooterLink>
              )}
            </CardFooter>
          </ProjectCard>
        ))}
      </Grid>
    </SectionContainer>
  );
};

// Styled Components
const SectionContainer = styled.div`
  margin-top: 48px;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 24px;
  text-align: center;
  background: linear-gradient(135deg, #ffffff, var(--text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div<{ type: Project['type'] }>`
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  transition: 
    border-color var(--transition-normal),
    transform var(--transition-normal),
    box-shadow var(--transition-normal);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5),
      0 0 20px 0 ${props => {
        if (props.type === 'Public Template') return 'rgba(var(--rasta-green-hsl), 0.15)';
        if (props.type === 'Personal Project') return 'rgba(var(--rasta-yellow-hsl), 0.15)';
        return 'rgba(var(--rasta-red-hsl), 0.25)'; // stronger red glow
      }};
    border-color: ${props => {
      if (props.type === 'Public Template') return 'var(--rasta-green)';
      if (props.type === 'Personal Project') return 'var(--rasta-yellow)';
      return 'var(--rasta-red)';
    }};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const TypeBadge = styled.span<{ type: Project['type'] }>`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${props => {
    if (props.type === 'Public Template') return 'rgba(0, 255, 102, 0.1)';
    if (props.type === 'Personal Project') return 'rgba(255, 204, 0, 0.1)';
    return 'rgba(255, 51, 51, 0.1)';
  }};
  color: ${props => {
    if (props.type === 'Public Template') return 'var(--rasta-green)';
    if (props.type === 'Personal Project') return 'var(--rasta-yellow)';
    return 'var(--rasta-red)';
  }};
`;

const ProjectTitle = styled.h4`
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 20px;
  flex-grow: 1;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 24px;
`;

const Tag = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-color);
  padding: 4px 8px;
  border-radius: 4px;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border-top: 1px solid var(--border-color);
  padding-top: 16px;
  margin-top: auto;
`;

const FooterLink = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--rasta-green);
  }
`;
