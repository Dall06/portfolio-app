import { useState } from 'react';
import styled from '@emotion/styled';
import { Mail, Terminal, ArrowRight, Cpu, Layers, ShieldCheck, Activity, Globe } from 'lucide-react';

// SVG Brand Icons to avoid compilation issues
const GithubIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg height={size} width={size} viewBox="0 0 16 16" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg height={size} width={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
  </svg>
);

const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg height={size} width={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.121 1.524 5.855L.057 23.215a.75.75 0 00.921.921l5.36-1.467A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.502-5.184-1.382l-.37-.215-3.833 1.048 1.049-3.833-.215-.37A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

interface Translation {
  badge: string;
  status: string;
  promo: string;
  promoLead: string;
  role: string;
  bio: string;
  contactBtn: string;
  ccTitle: string;
  ccBrief: string;
  ccOptionWa: string;
  ccOptionLi: string;
  ccOptionEmail: string;
  ccQrLabel: string;
  ccQrLinkText: string;
  servicesTitle: string;
  servicesSubtitle: string;
  s1Title: string;
  s1Desc: string;
  s2Title: string;
  s2Desc: string;
  s3Title: string;
  s3Desc: string;
  s4Title: string;
  s4Desc: string;
  formTitle: string;
  formName: string;
  formEmail: string;
  formCompany: string;
  formMessage: string;
  formSubmit: string;
  formOr: string;
}

const translations: Record<'es' | 'en', Translation> = {
  es: {
    badge: 'ESTADO: DISPONIBLE',
    status: 'ONLINE',
    promo: 'Consultor de software disponible para digitalización de negocios y arquitectura técnica.',
    promoLead: 'LEÓN, MX',
    role: 'Consultor en Digitalización de Procesos y Negocios',
    bio: 'Elimino la ineficiencia operativa de tu negocio mediante el diseño de arquitecturas de software estables, integraciones de APIs de pago (Stripe, Yuno) y automatizaciones que sustituyen flujos manuales lentos.',
    contactBtn: 'Consultar',
    ccTitle: 'Contacto Directo',
    ccBrief: 'Escríbeme o agenda una llamada técnica directamente para analizar cómo optimizar tus procesos operativos.',
    ccOptionWa: 'WhatsApp Directo',
    ccOptionLi: 'LinkedIn Profesional',
    ccOptionEmail: 'devleon.06@gmail.com',
    ccQrLabel: 'ESCANEA MI LINKEDIN',
    ccQrLinkText: 'Ver Perfil Técnico',
    servicesTitle: 'Servicios de Asesoría Técnica',
    servicesSubtitle: 'Soluciones estructuradas para automatizar procesos manuales y digitalizar las operaciones de tu negocio.',
    s1Title: 'Digitalización y Automatización de Flujos',
    s1Desc: 'Reemplazo de tareas operativas manuales y repetitivas por procesos de software programados. Conexión de herramientas del día a día, generación automática de reportes y envío automático de alertas.',
    s2Title: 'Integración de APIs y Pasarelas de Pago',
    s2Desc: 'Configuración de cobros en línea mediante pasarelas de pago globales (Stripe, Yuno) y procesadores locales. Flujos de checkout fluidos y automatización de conciliaciones de depósitos.',
    s3Title: 'Arquitectura y Desarrollo SaaS a Medida',
    s3Desc: 'Modelado de bases de datos seguras y desarrollo de microservicios robustos en Go y Python. Código basado en estándares profesionales de desacoplamiento (Arquitectura Hexagonal).',
    s4Title: 'Optimización, Rendimiento y Seguridad',
    s4Desc: 'Auditoría técnica de sistemas lentos y bases de datos congestionadas. Optimización de consultas SQL pesadas, enmascaramiento de logs sensibles y monitoreo de fiabilidad de sistemas.',
    formTitle: 'Solicitud de Contacto',
    formName: 'Tu Nombre',
    formEmail: 'Tu Correo Electrónico',
    formCompany: 'Empresa / Negocio (Opcional)',
    formMessage: '¿Qué proceso o tarea manual te gustaría automatizar?',
    formSubmit: 'Enviar Solicitud',
    formOr: 'O prefiere escribir por WhatsApp directamente'
  },
  en: {
    badge: 'STATUS: AVAILABLE',
    status: 'ONLINE',
    promo: 'Software consultant available for process digitalization and technical systems architecture.',
    promoLead: 'LEON, MX',
    role: 'Process & Business Digitalization Consultant',
    bio: 'I eliminate operational inefficiency in your business by designing stable software architectures, payment API integrations (Stripe, Yuno), and custom automation that replaces slow manual workflows.',
    contactBtn: 'Inquire',
    ccTitle: 'Direct Contact',
    ccBrief: 'Message me or schedule a technical call directly to analyze how to optimize your business operations.',
    ccOptionWa: 'Direct WhatsApp',
    ccOptionLi: 'Professional LinkedIn',
    ccOptionEmail: 'devleon.06@gmail.com',
    ccQrLabel: 'SCAN MY LINKEDIN',
    ccQrLinkText: 'View Technical Profile',
    servicesTitle: 'Technical Consulting Services',
    servicesSubtitle: 'Structured solutions to automate manual processes and digitalize your business operations.',
    s1Title: 'Process Automation & Digitalization',
    s1Desc: 'Replacing manual and repetitive operational tasks with programmed software processes. Seamless connection of everyday tools, automatic report generation, and automated alerts.',
    s2Title: 'API & Payment Gateway Integration',
    s2Desc: 'Setting up online payments using global payment systems (Stripe, Yuno) and local processors. Smooth checkout flows and automated bank deposit reconciliation.',
    s3Title: 'Custom SaaS Architecture & Development',
    s3Desc: 'Secure database modeling and robust microservices development in Go and Python. Code built on professional decoupling standards (Hexagonal Architecture).',
    s4Title: 'Optimization, Performance & Security',
    s4Desc: 'Technical auditing of slow systems and congested databases. Optimization of heavy SQL queries, sensitive log data masking, and system reliability monitoring.',
    formTitle: 'Contact Request',
    formName: 'Your Name',
    formEmail: 'Your Email Address',
    formCompany: 'Company / Business (Optional)',
    formMessage: 'What process or manual task would you like to automate?',
    formSubmit: 'Submit Request',
    formOr: 'Or prefer to message via WhatsApp directly'
  }
};

export default function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = translations[lang];

  return (
    <MainLayout>
      {/* Header Fijo Minimalista */}
      <nav className="nav">
        <div className="wrapper container">
          <div className="navInner">
            <Logo href="#">
              <Terminal size={15} color="var(--accent-cyan)" />
              <span>diegoaleon.dev</span>
            </Logo>
            <div className="navRight">
              <LangSwitcher onClick={() => setLang(lang === 'es' ? 'en' : 'es')} title="Switch Language">
                <Globe size={13} />
                <span>{lang.toUpperCase()}</span>
              </LangSwitcher>
              <div className="navSocials">
                <a href="https://github.com/Dall06" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
                <a href="https://www.linkedin.com/in/diego-a-le%C3%B3n-6b821a20a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
              </div>
              <a href="#contact-section" className="btnSecondary">{t.contactBtn}</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Banner de Estado Glacial */}
      <div className="promo">
        <div className="wrapper container">
          <div className="promoInner">
            <span className="promoTag">{t.status}</span>
            <span className="promoText">
              {t.promo} — <strong>{t.promoLead}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Split Pane Layout */}
      <SplitContainer className="wrapper container">
        {/* Lado Izquierdo: Tarjeta de Identidad y Contacto Fija */}
        <IdentityPanel>
          <div className="profile-card glass-panel">
            <BadgeWrapper>
              <span className="profile-badge">{t.badge}</span>
              <div className="ccOnline">
                <span className="ccDot" />
              </div>
            </BadgeWrapper>
            
            <ProfileInfo>
              <h2>Diego León López</h2>
              <h3>{t.role}</h3>
              <p>{t.bio}</p>
            </ProfileInfo>

            <ContactInfoBlock>
              <a href="https://wa.me/524735978664" target="_blank" rel="noopener noreferrer" className="contact-link">
                <WhatsAppIcon size={14} />
                <span>{t.ccOptionWa}</span>
                <ArrowRight size={12} className="arrow-icon" />
              </a>
              <a href="https://www.linkedin.com/in/diego-a-le%C3%B3n-6b821a20a/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <LinkedinIcon size={14} />
                <span>{t.ccOptionLi}</span>
                <ArrowRight size={12} className="arrow-icon" />
              </a>
              <a href="mailto:devleon.06@gmail.com" className="contact-link">
                <Mail size={14} />
                <span>{t.ccOptionEmail}</span>
                <ArrowRight size={12} className="arrow-icon" />
              </a>
            </ContactInfoBlock>

            <QrSection>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://www.linkedin.com/in/diego-a-le%C3%B3n-6b821a20a/&color=05060b&bgcolor=fafafa"
                alt="QR Contact"
              />
              <div className="qr-details">
                <span className="qr-label">{t.ccQrLabel}</span>
                <a href="https://www.linkedin.com/in/diego-a-le%C3%B3n-6b821a20a/" target="_blank" rel="noopener noreferrer" className="qr-url">
                  {t.ccQrLinkText} &rarr;
                </a>
              </div>
            </QrSection>
          </div>
        </IdentityPanel>

        {/* Lado Derecho: Propuesta de Servicios Directa y Formulario */}
        <DashboardPanel>
          <div className="glass-panel main-services-card">
            <ServicesLayout>
              <TabTitle>{t.servicesTitle}</TabTitle>
              <TabIntro>{t.servicesSubtitle}</TabIntro>
              
              <ServicesList>
                <ServiceItem>
                  <IconContainer>
                    <Cpu size={18} />
                  </IconContainer>
                  <div className="content">
                    <h4>{t.s1Title}</h4>
                    <p>{t.s1Desc}</p>
                  </div>
                </ServiceItem>

                <ServiceItem>
                  <IconContainer>
                    <Layers size={18} />
                  </IconContainer>
                  <div className="content">
                    <h4>{t.s2Title}</h4>
                    <p>{t.s2Desc}</p>
                  </div>
                </ServiceItem>

                <ServiceItem>
                  <IconContainer>
                    <Activity size={18} />
                  </IconContainer>
                  <div className="content">
                    <h4>{t.s3Title}</h4>
                    <p>{t.s3Desc}</p>
                  </div>
                </ServiceItem>

                <ServiceItem>
                  <IconContainer>
                    <ShieldCheck size={18} />
                  </IconContainer>
                  <div className="content">
                    <h4>{t.s4Title}</h4>
                    <p>{t.s4Desc}</p>
                  </div>
                </ServiceItem>
              </ServicesList>
            </ServicesLayout>
          </div>

          {/* Formulario de Contacto Directo */}
          <div className="glass-panel main-services-card form-section" id="contact-section" style={{ marginTop: '24px' }}>
            <TabTitle>{t.formTitle}</TabTitle>
            <TabIntro style={{ marginBottom: '20px' }}>
              {t.ccBrief}
            </TabIntro>

            <ContactForm action="https://formsubmit.co/devleon.06@gmail.com" method="POST">
              {/* FormSubmit configurations */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={window.location.href} />

              <FormGroup>
                <label htmlFor="name">{t.formName}</label>
                <input type="text" id="name" name="name" required placeholder="Diego López" />
              </FormGroup>

              <FormGroup>
                <label htmlFor="email">{t.formEmail}</label>
                <input type="email" id="email" name="email" required placeholder="cliente@empresa.com" />
              </FormGroup>

              <FormGroup>
                <label htmlFor="company">{t.formCompany}</label>
                <input type="text" id="company" name="company" placeholder="Acme Corp" />
              </FormGroup>

              <FormGroup>
                <label htmlFor="message">{t.formMessage}</label>
                <textarea id="message" name="message" required rows={4} placeholder="..." />
              </FormGroup>

              <FormSubmitButton type="submit">
                <span>{t.formSubmit}</span>
                <ArrowRight size={14} />
              </FormSubmitButton>
            </ContactForm>

            <FormAlternative href="https://wa.me/524735978664" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={13} />
              <span>{t.formOr} &rarr;</span>
            </FormAlternative>
          </div>
        </DashboardPanel>
      </SplitContainer>

      <Footer>
        <div className="wrapper container footer-content">
          <p>© {new Date().getFullYear()} Diego León. Asesoría en Automatización y Digitalización de Negocios.</p>
          <p className="clean-code">Clean Code & Hexagonal Architecture Advocate</p>
        </div>
      </Footer>
    </MainLayout>
  );
}

// Styled Components
const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 52px;
  scroll-behavior: smooth;
  
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(4, 6, 13, 0.9);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border-default);
  }

  .navInner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 52px;
  }

  .navRight {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .navSocials {
    display: flex;
    align-items: center;
    gap: 4px;
    padding-right: 12px;
    border-right: 1px solid var(--border-default);
    
    a {
      display: flex;
      width: 28px;
      height: 28px;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      border-radius: var(--radius-sm);
      transition: color var(--transition-normal), background-color var(--transition-normal);
      
      &:hover {
        color: var(--accent-cyan);
        background: rgba(59, 130, 246, 0.05);
      }
    }
  }

  .promo {
    background: rgba(59, 130, 246, 0.02);
    border-bottom: 1px solid rgba(59, 130, 246, 0.05);
    padding: 6px 0;
    text-align: center;
  }

  .promoInner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 11px;
  }

  .promoTag {
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    color: var(--accent-cyan);
    font-size: 9px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: var(--radius-sm);
    letter-spacing: 0.7px;
  }

  .promoText {
    color: var(--text-secondary);
  }

  .btnSecondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: var(--radius-md);
    font-size: 12px;
    font-weight: 600;
    border: 1px solid var(--border-default);
    cursor: pointer;
    background: transparent;
    color: var(--text-secondary);
    transition: border-color var(--transition-normal), background-color var(--transition-normal), color var(--transition-normal);
    
    &:hover {
      color: var(--text-primary);
      border-color: var(--border-hover);
      background: var(--bg-secondary);
    }
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--display);
  font-weight: 800;
  font-size: 15px;
  color: var(--text-primary);
`;

const LangSwitcher = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);
  
  &:hover {
    color: var(--text-primary);
    border-color: var(--border-hover);
    background: var(--bg-secondary);
  }

  svg {
    opacity: 0.7;
  }
`;

const SplitContainer = styled.div`
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 36px;
  margin-top: 48px;
  margin-bottom: 48px;
  align-items: start;
  flex-grow: 1;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

const IdentityPanel = styled.div`
  position: sticky;
  top: 88px;
  
  .profile-card {
    padding: 32px;
  }
  
  @media (max-width: 900px) {
    position: static;
  }
`;

const BadgeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  .profile-badge {
    font-size: 9px;
    font-weight: 700;
    color: var(--accent-cyan);
    border: 1px solid rgba(59, 130, 246, 0.2);
    background: rgba(59, 130, 246, 0.05);
    padding: 4px 10px;
    border-radius: var(--radius-sm);
    letter-spacing: 0.05em;
  }

  .ccOnline {
    display: flex;
    align-items: center;
  }

  .ccDot {
    width: 6px;
    height: 6px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 8px #10b981;
    animation: pulse-dot 2.5s infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.9); }
  }
`;

const ProfileInfo = styled.div`
  margin-bottom: 24px;
  
  h2 {
    font-size: 24px;
    color: var(--text-primary);
    margin-bottom: 6px;
    font-weight: 800;
  }

  h3 {
    font-size: 13px;
    font-weight: 600;
    color: var(--accent-cyan);
    margin-bottom: 16px;
    line-height: 1.4;
  }

  p {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.6;
  }
`;

const ContactInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
  
  .contact-link {
    display: flex;
    align-items: center;
    padding: 10px 14px;
    font-size: 12px;
    color: var(--text-secondary);
    border: 1px solid var(--border-default);
    background: rgba(255, 255, 255, 0.01);
    border-radius: var(--radius-md);
    transition: all var(--transition-normal);
    
    svg {
      margin-right: 12px;
      color: var(--text-muted);
      transition: color var(--transition-normal);
    }
    
    .arrow-icon {
      margin-left: auto;
      margin-right: 0;
      opacity: 0.3;
      transition: transform var(--transition-normal), opacity var(--transition-normal);
    }
    
    &:hover {
      border-color: var(--accent-cyan);
      color: var(--text-primary);
      background: rgba(59, 130, 246, 0.02);
      
      svg {
        color: var(--accent-cyan);
      }
      
      .arrow-icon {
        opacity: 0.8;
        transform: translateX(3px);
        color: var(--accent-cyan);
      }
    }
  }
`;

const QrSection = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding-top: 20px;
  border-top: 1px solid var(--border-default);
  
  img {
    width: 52px;
    height: 52px;
    background: #fff;
    padding: 2px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-default);
  }

  .qr-details {
    display: flex;
    flex-direction: column;
  }

  .qr-label {
    font-size: 9px;
    font-weight: 700;
    color: var(--text-muted);
    letter-spacing: 0.05em;
  }

  .qr-url {
    font-size: 11px;
    color: var(--accent-cyan);
    font-weight: 600;
    transition: color var(--transition-normal);
    
    &:hover {
      color: var(--accent-blue);
    }
  }
`;

const DashboardPanel = styled.div`
  display: flex;
  flex-direction: column;
  
  &.main-services-card {
    padding: 36px;
    
    @media (max-width: 640px) {
      padding: 24px;
    }
  }
`;

const TabTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 6px;
  color: var(--text-primary);
`;

const TabIntro = styled.p`
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 28px;
`;

const ServicesLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const ServicesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ServiceItem = styled.div`
  display: flex;
  gap: 16px;
  align-items: start;
  
  .content {
    h4 {
      font-size: 14px;
      color: var(--text-primary);
      margin-bottom: 6px;
      font-weight: 700;
    }
    
    p {
      font-size: 12.5px;
      color: var(--text-secondary);
      line-height: 1.6;
    }
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(59, 130, 246, 0.03);
  border: 1px solid rgba(59, 130, 246, 0.15);
  color: var(--accent-cyan);
  border-radius: var(--radius-md);
  flex-shrink: 0;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  
  label {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-secondary);
    letter-spacing: 0.02em;
  }

  input, textarea {
    background: var(--bg-primary);
    border: 1px solid var(--border-default);
    color: var(--text-primary);
    border-radius: var(--radius-md);
    padding: 10px 14px;
    font-size: 12.5px;
    font-family: var(--sans);
    transition: border-color var(--transition-normal);
    width: 100%;
    
    &:focus {
      outline: none;
      border-color: var(--accent-cyan);
    }
    
    &::placeholder {
      color: var(--text-muted);
    }
  }
  
  textarea {
    resize: vertical;
  }
`;

const FormSubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  background: var(--accent-cyan);
  color: #f8fafc;
  border: none;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.15);
  transition: all var(--transition-normal);
  margin-top: 8px;
  
  &:hover {
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
    transform: translateY(-1px);
  }
`;

const FormAlternative = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 11.5px;
  color: var(--text-secondary);
  transition: color var(--transition-normal);
  
  &:hover {
    color: var(--accent-cyan);
  }
`;

const Footer = styled.footer`
  border-top: 1px solid var(--border-default);
  background: var(--bg-secondary);
  padding: 32px 0;
  text-align: center;
  font-size: 12px;
  color: var(--text-muted);
  margin-top: auto;
  
  .footer-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .clean-code {
    font-weight: 600;
    color: var(--text-secondary);
    font-size: 11px;
    letter-spacing: 0.05em;
  }
`;
