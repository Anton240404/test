import React from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  name: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

 export class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    if (!props.model || !props.params) {
      throw new Error('model and params are required');
    }

    this.state = {
      paramValues: [...props.model.paramValues]
    };
  }

  handleParamChange = (paramId: number, value: string) => {
    this.setState(prevState => {
      const existingIndex = prevState.paramValues.findIndex(pv => pv.paramId === paramId);
      const newParamValues = [...prevState.paramValues];

      if (existingIndex >= 0) {
        newParamValues[existingIndex] = { paramId, value };
      } else {
        newParamValues.push({ paramId, value });
      }

      return { paramValues: newParamValues };
    });
  };

  getParamValue = (paramId: number): string => {
    const paramValue = this.state.paramValues.find(pv => pv.paramId === paramId);
    return paramValue ? paramValue.value : '';
  };

  public getModel(): Model {
    return {
      ...this.props.model,
      paramValues: this.state.paramValues
    };
  }

  render() {
    const { params } = this.props;

    return (
        <div style={{
          fontFamily: 'Arial, sans-serif',
          maxWidth: '500px',
          margin: '20px auto',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          borderRadius: '5px',
          backgroundColor: '#fff'
        }}>
          <h2 style={{
            color: '#333',
            borderBottom: '1px solid #eee',
            paddingBottom: '10px',
            marginTop: '0',
            marginBottom: '20px'
          }}>Редактор параметров</h2>

          <div style={{ marginBottom: '20px' }}>
            {params.map(param => (
                <div key={param.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <label style={{
                    width: '120px',
                    fontWeight: '600',
                    color: '#555',
                    marginRight: '15px'
                  }}>
                    {param.name}:
                  </label>
                  <input
                      type="text"
                      value={this.getParamValue(param.id)}
                      onChange={(e) => this.handleParamChange(param.id, e.target.value)}
                      style={{
                        flex: '1',
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        outline: 'none',
                        borderColor: '#4CAF50',
                        boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.2)'
                      }
                      }
                  />
                </div>
            ))}
          </div>

          <div style={{ textAlign: 'right' }}>
            <button
                onClick={() => console.log(this.getModel())}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',

                }}
            >
              Сохранить изменения
            </button>
          </div>
        </div>
    );
  }
}

// Пример использования
const exampleParams: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" }
];

const exampleModel: Model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" }
  ],
  colors: []
};

export const App = () => {
  const paramEditorRef = React.useRef<ParamEditor>(null);

  return (
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <ParamEditor
            ref={paramEditorRef}
            params={exampleParams}
            model={exampleModel}
        />
        <div style={{
          maxWidth: '500px',
          margin: '20px auto',
          textAlign: 'center'
        }}>
        </div>
      </div>
  );
};

