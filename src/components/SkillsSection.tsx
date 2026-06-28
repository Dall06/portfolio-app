import React from 'react';
import styled from '@emotion/styled';
import { Database, Server, Monitor, ShieldAlert } from 'lucide-react';

interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
}

interface SkillGroup {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
  color: string;
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Lenguajes y Backend Core',
    icon: <Server size={18} />,
    color: 'var(--rasta-green)',
    skills: [
      { name: 'Golang', level: 'Expert' },
      { name: 'Python', level: 'Expert' },
      { name: 'Java / JEE', level: 'Advanced' },
      { name: 'JavaScript / Node.js', level: 'Advanced' },
      { name: 'Kotlin', level: 'Intermediate' },
      { name: 'Dart', level: 'Intermediate' }
    ]
  },
  {
    title: 'Frameworks, APIs y Protocolos',
    icon: <ShieldAlert size={18} />,
    color: 'var(--rasta-yellow)',
    skills: [
      { name: 'Echo / Gin / Fiber (Go)', level: 'Expert' },
      { name: 'Spring Boot (Java)', level: 'Advanced' },
      { name: 'gRPC Microservices', level: 'Advanced' },
      { name: 'WebRTC / Go Pion', level: 'Advanced' },
      { name: 'REST APIs', level: 'Expert' },
      { name: 'Selenium', level: 'Advanced' }
    ]
  },
  {
    title: 'Bases de Datos e Infraestructura',
    icon: <Database size={18} />,
    color: 'var(--rasta-green)',
    skills: [
      { name: 'PostgreSQL / Bun / SQLx', level: 'Expert' },
      { name: 'MySQL', level: 'Expert' },
      { name: 'SQL Server', level: 'Advanced' },
      { name: 'MongoDB', level: 'Advanced' },
      { name: 'NATS Broker / Redis', level: 'Advanced' }
    ]
  },
  {
    title: 'DevOps, Cloud y Frontend',
    icon: <Monitor size={18} />,
    color: 'var(--rasta-red)',
    skills: [
      { name: 'Docker / Compose', level: 'Expert' },
      { name: 'AWS / DigitalOcean', level: 'Advanced' },
      { name: 'GitHub Actions (CI/CD)', level: 'Expert' },
      { name: 'React.js', level: 'Advanced' },
      { name: 'Flutter', level: 'Intermediate' },
      { name: 'Git / Observability (slog)', level: 'Expert' }
    ]
  }
];

export const SkillsSection: React.FC = () => {
  return (
    <SectionContainer>
      <SectionTitle>Inventario Técnico</SectionTitle>
      <Grid>
        {skillGroups.map((group, idx) => (
          <GroupCard key={idx} className="glass-panel" color={group.color}>
            <GroupTitle color={group.color}>
              {group.icon}
              <h4>{group.title}</h4>
            </GroupTitle>
            <SkillsList>
              {group.skills.map((skill, sIdx) => (
                <SkillBadge key={sIdx} color={group.color}>
                  <span className="name">{skill.name}</span>
                  <span className="level">{skill.level}</span>
                </SkillBadge>
              ))}
            </SkillsList>
          </GroupCard>
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
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GroupCard = styled.div<{ color: string }>`
  padding: 24px;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 0 20px ${props => props.color}15;
    border-color: ${props => props.color}40;
  }
`;

const GroupTitle = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  color: ${props => props.color};
  
  h4 {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SkillBadge = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  font-size: 11px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);

  .name {
    padding: 6px 10px;
    color: var(--text-primary);
    font-weight: 500;
  }

  .level {
    padding: 6px 8px;
    background: ${props => props.color}15;
    color: ${props => props.color};
    font-weight: 700;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
  }
`;
