import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Layers, ShieldAlert, Code2 } from 'lucide-react';

interface LayerDetails {
  name: string;
  title: string;
  description: string;
  rules: string[];
  code: string;
}

const layersData: Record<string, LayerDetails> = {
  domain: {
    name: 'domain',
    title: 'Capa de Dominio (Core)',
    description: 'El núcleo absoluto del software. Contiene las estructuras de datos (entidades) y la lógica de negocio pura del sistema.',
    rules: [
      'Debe estar libre de dependencias externas o de frameworks.',
      'No se permiten etiquetas de bases de datos/ORM (como bun o gorm).',
      'Es 100% portable y agnóstica.'
    ],
    code: `package domain

import "golang.org/x/crypto/bcrypt"

type User struct {
	ID           string
	Email        string
	PasswordHash string
	Name         string
}

func (u *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(password))
	return err == nil
}`
  },
  ports: {
    name: 'ports',
    title: 'Capa de Puertos (Interfaces)',
    description: 'Define los contratos formales para comunicarse con el Core. Actúa como la frontera del hexágono.',
    rules: [
      'Puertos de Entrada (Usecase): Interfaces que consumen los handlers HTTP.',
      'Puertos de Salida (Repository): Interfaces que implementan los repositorios de datos.',
      'Toda la comunicación interna/externa se realiza a través de estas interfaces.'
    ],
    code: `package ports

import (
	"context"
	"base-api/srv/user/domain"
)

type UserRepository interface {
	Create(ctx context.Context, user *domain.User) (*domain.User, error)
	GetByEmail(ctx context.Context, email string) (*domain.User, error)
}

type UserUsecase interface {
	Signup(ctx context.Context, input SignupInput) (*AuthResponse, error)
	Login(ctx context.Context, input LoginInput) (*AuthResponse, error)
}`
  },
  usecases: {
    name: 'usecases',
    title: 'Capa de Casos de Uso',
    description: 'Orquesta el flujo de datos. Implementa las reglas de aplicación específicas, llamando a los repositorios a través de puertos.',
    rules: [
      'Implementa los puertos de entrada (interfaces de usecase).',
      'No conoce detalles de infraestructura (ej: no sabe qué base de datos física se usa).',
      'Recibe sus dependencias por Inyección de Dependencias (DI).'
    ],
    code: `package usecases

import (
	"context"
	"base-api/pkg/errs"
	"base-api/srv/user/domain"
	"base-api/srv/user/ports"
)

type userUsecase struct {
	repo ports.UserRepository
}

func (u *userUsecase) Login(ctx context.Context, email, password string) (*ports.AuthResponse, error) {
	user, err := u.repo.GetByEmail(ctx, email)
	if err != nil {
		return nil, errs.UnauthorizedError("credenciales inválidas")
	}
	if !user.CheckPassword(password) {
		return nil, errs.UnauthorizedError("credenciales inválidas")
	}
	return &ports.AuthResponse{User: user}, nil
}`
  },
  handlers: {
    name: 'handlers',
    title: 'Adaptadores de Entrada (Handlers)',
    description: 'El punto de entrada del exterior al hexágono. En este proyecto, controladores HTTP usando el framework Echo.',
    rules: [
      'Lee la petición del cliente y valida el cuerpo del JSON (bind/validate).',
      'Llama a los casos de uso correspondientes.',
      'Mapea los errores de dominio a códigos de respuesta REST estándar.'
    ],
    code: `package handlers

import (
	"net/http"
	"base-api/pkg/errs"
	"base-api/srv/user/ports"
	"github.com/labstack/echo/v4"
)

func (h *UserHandler) Login(c echo.Context) error {
	var input ports.LoginInput
	if err := c.Bind(&input); err != nil {
		return errs.Handle(c, errs.ValueError("cuerpo inválido"))
	}
	res, err := h.usecase.Login(c.Request().Context(), input)
	if err != nil {
		return errs.Handle(c, err)
	}
	return c.JSON(http.StatusOK, res)
}`
  },
  repositories: {
    name: 'repositories',
    title: 'Adaptadores de Salida (Repositories)',
    description: 'Implementación concreta del acceso a sistemas externos. Conecta el software con PostgreSQL mediante Bun ORM.',
    rules: [
      'Implementa los puertos de salida (interfaces de repositorio).',
      'Contiene las queries SQL o llamadas a APIs externas específicas.',
      'Mapea las estructuras de base de datos a entidades de dominio limpias.'
    ],
    code: `package repositories

import (
	"context"
	"base-api/srv/user/domain"
	"github.com/uptrace/bun"
)

type UserRepository struct {
	db bun.IDB
}

func (r *UserRepository) Create(ctx context.Context, user *domain.User) (*domain.User, error) {
	_, err := r.db.NewInsert().
		Model(user).
		Exec(ctx)
	if err != nil {
		return nil, err
	}
	return user, nil
}`
  }
};

export const HexagonalVisualizer: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string>('domain');
  const activeData = layersData[activeLayer];

  return (
    <VisualizerContainer className="glass-panel">
      <DiagramSection>
        <LayersHeader>
          <Layers size={18} color="var(--primary-glow)" />
          <h3>Modelo de Capas Interactivo</h3>
        </LayersHeader>
        
        <HexagonLayout>
          {/* Layer Rings representing concentric hexagonal components */}
          <OuterRing 
            active={activeLayer === 'handlers' || activeLayer === 'repositories'} 
            onClick={() => setActiveLayer('handlers')}
            title="Adaptadores (Infraestructura)"
          >
            <InnerRing2 
              active={activeLayer === 'usecases'} 
              onClick={(e) => { e.stopPropagation(); setActiveLayer('usecases'); }}
              title="Casos de Uso (Aplicación)"
            >
              <InnerRing1 
                active={activeLayer === 'ports'} 
                onClick={(e) => { e.stopPropagation(); setActiveLayer('ports'); }}
                title="Puertos (Interfaces)"
              >
                <CoreCenter 
                  active={activeLayer === 'domain'} 
                  onClick={(e) => { e.stopPropagation(); setActiveLayer('domain'); }}
                  title="Dominio (Core)"
                >
                  DOMINIO
                </CoreCenter>
              </InnerRing1>
            </InnerRing2>
          </OuterRing>
          
          <LegendLabel>Haz clic en una capa para explorar las reglas de la arquitectura</LegendLabel>
        </HexagonLayout>
      </DiagramSection>

      <DetailsSection>
        <DetailsHeader>
          <h4>{activeData.title}</h4>
        </DetailsHeader>
        
        <Description>{activeData.description}</Description>
        
        <RulesList>
          <h5>
            <ShieldAlert size={14} color="#f59e0b" />
            Reglas Arquitectónicas
          </h5>
          <ul>
            {activeData.rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </RulesList>

        <CodePreview>
          <h5>
            <Code2 size={14} color="var(--primary-glow)" />
            Go Code Preview
          </h5>
          <pre><code>{activeData.code}</code></pre>
        </CodePreview>
      </DetailsSection>
    </VisualizerContainer>
  );
};

// Styled Components
const VisualizerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  height: 520px;
  overflow: hidden;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const DiagramSection = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
  background: rgba(0, 0, 0, 0.1);
  
  @media (max-width: 900px) {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
`;

const LayersHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  
  h3 {
    font-size: 18px;
  }
`;

const HexagonLayout = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const LegendLabel = styled.div`
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 24px;
  text-align: center;
`;

// Ring Styled Components (Concentric layers representation)
const RingBase = styled.div<{ active: boolean }>`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-normal);
`;

const OuterRing = styled(RingBase)`
  width: 280px;
  height: 280px;
  background: ${props => props.active ? 'rgba(var(--rasta-red-hsl), 0.12)' : 'rgba(255, 255, 255, 0.02)'};
  border: 2px solid ${props => props.active ? 'var(--rasta-red)' : 'rgba(255, 255, 255, 0.05)'};
  box-shadow: ${props => props.active ? '0 0 20px rgba(var(--rasta-red-hsl), 0.25)' : 'none'};
  
  &:hover {
    border-color: ${props => props.active ? 'var(--rasta-red)' : 'rgba(255, 255, 255, 0.15)'};
  }
`;

const InnerRing2 = styled(RingBase)`
  width: 210px;
  height: 210px;
  background: ${props => props.active ? 'rgba(var(--rasta-yellow-hsl), 0.12)' : 'rgba(0, 0, 0, 0.2)'};
  border: 2px dashed ${props => props.active ? 'var(--rasta-yellow)' : 'rgba(255, 255, 255, 0.08)'};
  box-shadow: ${props => props.active ? '0 0 20px rgba(var(--rasta-yellow-hsl), 0.25)' : 'none'};

  &:hover {
    border-color: ${props => props.active ? 'var(--rasta-yellow)' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const InnerRing1 = styled(RingBase)`
  width: 140px;
  height: 140px;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.4)'};
  border: 2px solid ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.1)'};
  box-shadow: ${props => props.active ? '0 0 15px rgba(255, 255, 255, 0.15)' : 'none'};

  &:hover {
    border-color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const CoreCenter = styled(RingBase)`
  width: 70px;
  height: 70px;
  background: ${props => props.active ? 'var(--rasta-green)' : 'rgba(255, 255, 255, 0.05)'};
  border: none;
  font-size: 10px;
  font-weight: 800;
  color: ${props => props.active ? '#000' : 'var(--text-secondary)'};
  letter-spacing: 0.1em;
  box-shadow: ${props => props.active ? '0 0 20px rgba(var(--rasta-green-hsl), 0.4)' : 'none'};
`;

const DetailsSection = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
`;

const DetailsHeader = styled.div`
  h4 {
    font-size: 20px;
    color: var(--text-primary);
    background: linear-gradient(135deg, var(--primary-glow), #ffffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Description = styled.p`
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
`;

const RulesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  background: rgba(245, 158, 11, 0.03);
  border: 1px solid rgba(245, 158, 11, 0.15);
  border-radius: 8px;

  h5 {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #f59e0b;
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  li {
    font-size: 12px;
    color: var(--text-secondary);
    position: relative;
    padding-left: 12px;
    line-height: 1.4;

    &::before {
      content: '▪';
      position: absolute;
      left: 0;
      color: #f59e0b;
      font-size: 8px;
      top: 0px;
    }
  }
`;

const CodePreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h5 {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text-primary);
  }

  pre {
    background: #03040a;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 16px;
    overflow-x: auto;
    font-family: var(--mono);
    font-size: 11px;
    color: #e5e7eb;
    line-height: 1.5;
  }
`;
