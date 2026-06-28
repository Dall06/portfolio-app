import React from 'react';
import styled from '@emotion/styled';
import { Cpu, RefreshCw, Layers, ShieldCheck } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  type: 'automation' | 'integration' | 'architecture' | 'optimization';
}

const services: Service[] = [
  {
    title: 'Digitalización y Automatización de Procesos',
    description: 'Elimino la fricción operativa y los errores manuales diseñando flujos automatizados que conectan tus herramientas del día a día, ahorrando horas de trabajo manual repetitivo.',
    icon: <Cpu size={24} />,
    benefits: ['Automatización de tareas repetitivas', 'Alertas y notificaciones (WhatsApp/Email)', 'Reducción de costos operativos'],
    type: 'automation'
  },
  {
    title: 'Integraciones de APIs y Pasarelas de Pago',
    description: 'Conecto tu negocio con las principales soluciones financieras globales y locales (Yuno, Stripe, procesadores locales) para automatizar cobros y conciliaciones sin complicaciones.',
    icon: <RefreshCw size={24} />,
    benefits: ['Pasarelas de pago y suscripciones', 'Integración de CRMs, ERPs y Webhooks', 'Flujos de checkout eficientes'],
    type: 'integration'
  },
  {
    title: 'Arquitectura de Software y Modelado SaaS',
    description: 'Diseño bases de datos optimizadas, APIs desacopladas y andamiajes de software escalables que garantizan que tu negocio digital crezca sobre bases sólidas.',
    icon: <Layers size={24} />,
    benefits: ['Modelado de bases de datos relacionales', 'Diseño de APIs REST y gRPC', 'Estructura modular limpia (Hexagonal)'],
    type: 'architecture'
  },
  {
    title: 'Seguridad, Estabilidad y Optimización',
    description: 'Audito tu infraestructura actual y bases de datos para identificar cuellos de botella, mejorar la velocidad de carga de tus servicios y proteger la información sensible.',
    icon: <ShieldCheck size={24} />,
    benefits: ['Optimización de consultas SQL lentas', 'Enmascaramiento de datos y logs seguros', 'Monitoreo técnico (slog / Observabilidad)'],
    type: 'optimization'
  }
];

export const ServicesSection: React.FC = () => {
  return (
    <SectionContainer>
      <SectionTitle>Servicios de Asesoría y Consultoría</SectionTitle>
      <SectionSubtitle>
        Ayudo a negocios tradicionales y startups a transformar sus operaciones manuales en sistemas automatizados modernos y rentables.
      </SectionSubtitle>
      <Grid>
        {services.map((service, idx) => (
          <ServiceCard key={idx} className="glass-panel" type={service.type}>
            <CardHeader type={service.type}>
              <IconWrapper type={service.type}>{service.icon}</IconWrapper>
              <TypeBadge type={service.type}>Asesoría Especializada</TypeBadge>
            </CardHeader>
            <ServiceTitle>{service.title}</ServiceTitle>
            <Description>{service.description}</Description>
            <BenefitsList>
              {service.benefits.map((benefit, bIdx) => (
                <BenefitItem key={bIdx}>
                  <CheckBullet type={service.type}>✓</CheckBullet>
                  <span>{benefit}</span>
                </BenefitItem>
              ))}
            </BenefitsList>
          </ServiceCard>
        ))}
      </Grid>
    </SectionContainer>
  );
};

// Styled Components
const SectionContainer = styled.div`
  margin-top: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 26px;
  margin-bottom: 8px;
  text-align: center;
  background: linear-gradient(135deg, #ffffff, var(--text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionSubtitle = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  text-align: center;
  max-width: 600px;
  margin: 0 auto 36px;
  line-height: 1.5;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div<{ type: Service['type'] }>`
  padding: 28px;
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
        if (props.type === 'automation') return 'rgba(var(--rasta-green-hsl), 0.15)';
        if (props.type === 'integration') return 'rgba(var(--rasta-yellow-hsl), 0.15)';
        return 'rgba(var(--rasta-red-hsl), 0.2)'; // rojo acentuado
      }};
    border-color: ${props => {
      if (props.type === 'automation') return 'var(--rasta-green)';
      if (props.type === 'integration') return 'var(--rasta-yellow)';
      return 'var(--rasta-red)';
    }};
  }
`;

const CardHeader = styled.div<{ type: Service['type'] }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div<{ type: Service['type'] }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: ${props => {
    if (props.type === 'automation') return 'rgba(var(--rasta-green-hsl), 0.1)';
    if (props.type === 'integration') return 'rgba(var(--rasta-yellow-hsl), 0.1)';
    return 'rgba(var(--rasta-red-hsl), 0.1)';
  }};
  color: ${props => {
    if (props.type === 'automation') return 'var(--rasta-green)';
    if (props.type === 'integration') return 'var(--rasta-yellow)';
    return 'var(--rasta-red)';
  }};
  border: 1px solid ${props => {
    if (props.type === 'automation') return 'rgba(var(--rasta-green-hsl), 0.2)';
    if (props.type === 'integration') return 'rgba(var(--rasta-yellow-hsl), 0.2)';
    return 'rgba(var(--rasta-red-hsl), 0.2)';
  }};
`;

const TypeBadge = styled.span<{ type: Service['type'] }>`
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-muted);
  border: 1px solid var(--border-default);
`;

const ServiceTitle = styled.h4`
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 12px;
  font-weight: 700;
`;

const Description = styled.p`
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
`;

const BenefitsList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
  border-top: 1px solid var(--border-default);
  padding-top: 16px;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-secondary);
`;

const CheckBullet = styled.span<{ type: Service['type'] }>`
  font-weight: bold;
  font-size: 14px;
  color: ${props => {
    if (props.type === 'automation') return 'var(--rasta-green)';
    if (props.type === 'integration') return 'var(--rasta-yellow)';
    return 'var(--rasta-red)';
  }};
`;
