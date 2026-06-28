import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { Terminal, Trash2, Send, UserPlus, LogIn, Lock, CheckCircle, HelpCircle } from 'lucide-react';
import { useSandboxStore } from '../store/sandboxStore';
import type { ConsoleLine } from '../store/sandboxStore';

export const SandboxConsole: React.FC = () => {
  const { history, isSending, token, clearConsole, sendRequest } = useSandboxStore();
  const [selectedMethod, setSelectedMethod] = useState<'POST_SIGNUP' | 'POST_LOGIN' | 'GET_ME'>('POST_SIGNUP');
  
  // Form states
  const [signupName, setSignupName] = useState('Diego León');
  const [signupEmail, setSignupEmail] = useState('diego@dall06.net');
  const [signupPassword, setSignupPassword] = useState('supersecret123');

  const [loginEmail, setLoginEmail] = useState('diego@dall06.net');
  const [loginPassword, setLoginPassword] = useState('supersecret123');

  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll console to bottom
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    if (selectedMethod === 'POST_SIGNUP') {
      await sendRequest('POST', '/api/v1/auth/signup', {
        name: signupName,
        email: signupEmail,
        password: signupPassword
      });
    } else if (selectedMethod === 'POST_LOGIN') {
      await sendRequest('POST', '/api/v1/auth/login', {
        email: loginEmail,
        password: loginPassword
      });
    } else if (selectedMethod === 'GET_ME') {
      await sendRequest('GET', '/api/v1/users/me');
    }
  };

  const getLineColor = (line: ConsoleLine) => {
    switch (line.type) {
      case 'request': return 'var(--rasta-green)';
      case 'response': {
        const status = line.details?.Status || 200;
        return status < 400 ? 'var(--rasta-green)' : 'var(--rasta-red)';
      }
      case 'slog-info': return 'var(--rasta-yellow)';
      case 'slog-error': return 'var(--rasta-red)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <SandboxContainer className="glass-panel">
      <FormSection>
        <FormHeader>
          <CpuIcon size={18} />
          <h3>Simulador de Base API</h3>
        </FormHeader>
        
        <MethodSelectors>
          <SelectorButton 
            active={selectedMethod === 'POST_SIGNUP'} 
            onClick={() => setSelectedMethod('POST_SIGNUP')}
          >
            <UserPlus size={14} />
            Signup
          </SelectorButton>
          <SelectorButton 
            active={selectedMethod === 'POST_LOGIN'} 
            onClick={() => setSelectedMethod('POST_LOGIN')}
          >
            <LogIn size={14} />
            Login
          </SelectorButton>
          <SelectorButton 
            active={selectedMethod === 'GET_ME'} 
            onClick={() => setSelectedMethod('GET_ME')}
          >
            <Lock size={14} />
            Get Me
          </SelectorButton>
        </MethodSelectors>

        <RequestForm onSubmit={handleSubmit}>
          {selectedMethod === 'POST_SIGNUP' && (
            <>
              <InputGroup>
                <label>Name</label>
                <input 
                  type="text" 
                  value={signupName} 
                  onChange={e => setSignupName(e.target.value)} 
                  placeholder="Diego León"
                  required
                />
              </InputGroup>
              <InputGroup>
                <label>Email</label>
                <input 
                  type="email" 
                  value={signupEmail} 
                  onChange={e => setSignupEmail(e.target.value)} 
                  placeholder="ejemplo@dall06.net"
                  required
                />
              </InputGroup>
              <InputGroup>
                <label>Password</label>
                <input 
                  type="password" 
                  value={signupPassword} 
                  onChange={e => setSignupPassword(e.target.value)} 
                  placeholder="••••••••"
                  required
                />
              </InputGroup>
            </>
          )}

          {selectedMethod === 'POST_LOGIN' && (
            <>
              <InputGroup>
                <label>Email</label>
                <input 
                  type="email" 
                  value={loginEmail} 
                  onChange={e => setLoginEmail(e.target.value)} 
                  placeholder="ejemplo@dall06.net"
                  required
                />
              </InputGroup>
              <InputGroup>
                <label>Password</label>
                <input 
                  type="password" 
                  value={loginPassword} 
                  onChange={e => setLoginPassword(e.target.value)} 
                  placeholder="••••••••"
                  required
                />
              </InputGroup>
            </>
          )}

          {selectedMethod === 'GET_ME' && (
            <TokenHelper>
              <div className="status-badge">
                {token ? (
                  <>
                    <CheckCircle size={16} color="#00ff66" />
                    <span>JWT Cargado en cabecera Authorization</span>
                  </>
                ) : (
                  <>
                    <HelpCircle size={16} color="#ef4444" />
                    <span className="error-text">No autenticado. Corre Signup/Login primero.</span>
                  </>
                )}
              </div>
              <p>Envía una cabecera HTTP <code>Authorization: Bearer &lt;token&gt;</code> al Gateway de prueba.</p>
            </TokenHelper>
          )}

          <SubmitButton type="submit" disabled={isSending}>
            <Send size={14} />
            {isSending ? 'Enviando...' : 'Ejecutar Request'}
          </SubmitButton>
        </RequestForm>
      </FormSection>

      <ConsoleSection>
        <ConsoleHeader>
          <WindowControls>
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </WindowControls>
          <ConsoleTitle>
            <Terminal size={14} />
            <span>base-api-slog-terminal.log</span>
          </ConsoleTitle>
          <ClearButton onClick={clearConsole} title="Limpiar Terminal">
            <Trash2 size={14} />
          </ClearButton>
        </ConsoleHeader>
        
        <ConsoleBody>
          {history.map(line => (
            <ConsoleLineWrapper key={line.id}>
              <LineTime>[{line.timestamp}]</LineTime>
              <LineContent color={getLineColor(line)}>
                {line.type === 'request' && <span className="arrow">➔</span>}
                {line.type === 'response' && <span className="arrow">◀</span>}
                {line.message}
              </LineContent>
              {line.details && (
                <DetailsJson>
                  {JSON.stringify(line.details, null, 2)}
                </DetailsJson>
              )}
            </ConsoleLineWrapper>
          ))}
          <ConsoleLineWrapper>
            <LineTime>[{new Date().toLocaleTimeString()}]</LineTime>
            <LineContent color="var(--text-primary)">
              <span className="arrow">➔</span>
              <span>api-ready</span>
              <ConsoleCursor />
            </LineContent>
          </ConsoleLineWrapper>
          <div ref={consoleEndRef} />
        </ConsoleBody>
      </ConsoleSection>
    </SandboxContainer>
  );
};

// Styled Components
const SandboxContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  overflow: hidden;
  height: 480px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const FormSection = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-default);
  
  @media (max-width: 900px) {
    border-right: none;
    border-bottom: 1px solid var(--border-default);
  }
`;

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  
  h3 {
    font-size: 18px;
    color: var(--text-primary);
  }
`;

const CpuIcon = styled(Terminal)`
  color: var(--rasta-green);
`;

const MethodSelectors = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 20px;
`;

const SelectorButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px;
  font-size: 12px;
  font-weight: 600;
  border-radius: var(--radius-md);
  border: 1px solid ${props => props.active ? 'var(--rasta-red)' : 'var(--border-default)'};
  background: ${props => props.active ? 'rgba(var(--rasta-red-hsl), 0.1)' : 'rgba(255, 255, 255, 0.01)'};
  color: ${props => props.active ? 'var(--rasta-red)' : 'var(--text-secondary)'};
  cursor: pointer;
  transition: all var(--transition-normal);
  
  &:hover {
    background: ${props => props.active ? 'rgba(var(--rasta-red-hsl), 0.15)' : 'rgba(255, 255, 255, 0.04)'};
    border-color: ${props => props.active ? 'var(--rasta-red)' : 'var(--border-hover)'};
  }
`;

const RequestForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  
  label {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  input {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-md);
    padding: 10px;
    color: var(--text-primary);
    font-size: 13px;
    font-family: var(--sans);
    transition: border-color var(--transition-normal), box-shadow var(--transition-normal);
    
    &:focus {
      outline: none;
      border-color: var(--rasta-red);
      box-shadow: 0 0 10px rgba(var(--rasta-red-hsl), 0.2);
    }
  }
`;

const TokenHelper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-default);

  .status-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 500;
  }

  .error-text {
    color: var(--rasta-red);
  }

  p {
    font-size: 11px;
    color: var(--text-secondary);
    line-height: 1.4;
  }

  code {
    font-family: var(--mono);
    color: var(--rasta-yellow);
    background: rgba(255, 255, 255, 0.04);
    padding: 2px 4px;
    border-radius: 4px;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: auto;
  padding: 12px;
  border-radius: var(--radius-md);
  border: none;
  background: linear-gradient(135deg, var(--rasta-red), var(--rasta-yellow));
  color: #fafafa;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: background var(--transition-normal), transform var(--transition-normal), box-shadow var(--transition-normal);
  
  &:hover:not(:disabled) {
    box-shadow: 0 0 15px rgba(var(--rasta-red-hsl), 0.45);
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: var(--text-muted);
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ConsoleSection = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(3, 4, 10, 0.95);
  font-family: var(--mono);
  font-size: 12px;
`;

const ConsoleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);
`;

const WindowControls = styled.div`
  display: flex;
  gap: 6px;
  
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    
    &.red { background: #ef4444; }
    &.yellow { background: #f59e0b; }
    &.green { background: #10b981; }
  }
`;

const ConsoleTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
  font-size: 11px;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--text-primary);
  }
`;

const ConsoleBody = styled.div`
  flex-grow: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ConsoleLineWrapper = styled.div`
  line-height: 1.5;
`;

const LineTime = styled.span`
  color: var(--text-muted);
  margin-right: 8px;
`;

const LineContent = styled.span<{ color: string }>`
  color: ${props => props.color};
  word-break: break-all;
  
  .arrow {
    margin-right: 6px;
    font-weight: bold;
  }
`;

const DetailsJson = styled.pre`
  margin-left: 20px;
  margin-top: 4px;
  color: #38bdf8;
  font-size: 11px;
  background: rgba(255, 255, 255, 0.02);
  padding: 8px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.03);
  overflow-x: auto;
`;

const ConsoleCursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 14px;
  background-color: var(--text-primary);
  margin-left: 6px;
  vertical-align: middle;
  animation: blink-cursor 1s steps(2, start) infinite;

  @keyframes blink-cursor {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;
