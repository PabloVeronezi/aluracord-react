import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { FaRegCommentDots } from "react-icons/fa"
import { FcFullTrash } from "react-icons/fc"
import { createClient } from '@supabase/supabase-js'

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxNzYyMywiZXhwIjoxOTU4ODkzNjIzfQ.CiXKnGsRM7340FD-IBpPNdDnosEg6nYLeXt0Ew3cEsU";
const SUPABASE_URL = "https://xsmouxfmqotfsimveirc.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

  React.useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        setListaDeMensagens(data);
      });
  }, []);

  function handleNovaMensagem(novaMensangem) {
    const mensagem = {
      // id: listaDeMensagens.length + 1,
      de: "PabloVeronezi",
      texto: novaMensangem,
    }

    supabaseClient
      .from("mensagens")
      .insert([
        mensagem
      ])
      .then(({ data }) => {
        setListaDeMensagens([
          data[0],
          ...listaDeMensagens,
        ]);

      })

    setMensagem("");
  }



  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[100],
        backgroundImage: "url(/react.png)",
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply', backgroundPosition: "center",
        color: appConfig.theme.colors.primary['aqua'],
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          border: "2px solid",
          borderRadius: '10px',
          backgroundColor: "rgba(0, 0, 0, .8)",
          height: '100%',
          maxWidth: '50%',
          maxHeight: '90vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: "rgba(33, 41, 49, .6)",
            flexDirection: 'column',
            border: "2px solid",
            borderColor: appConfig.theme.colors.primary["purple"],
            borderRadius: '5px',
            padding: '16px',
          }}
        >

          <MessageList mensagens={listaDeMensagens} setListaDeMensagens={setListaDeMensagens} />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              value={mensagem}
              onChange={event => {
                const valor = event.target.value;
                setMensagem(valor)
              }}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  if (!handleNovaMensagem(mensagem)) return;
                  handleNovaMensagem(mensagem)
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              type='submit'
              label={<FaRegCommentDots size={26} color="#5FABEB" />}
              onClick={event => {
                event.preventDefault();
                handleNovaMensagem(mensagem);
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColorLight: appConfig.theme.colors.primary["100"],
                mainColorStrong: "rgba(0, 0, 0, .8)",
              }}
              styleSheet={{
                padding: "4px 8px",
                backgroundColor: "rgba(0, 0, 0, .3)",
                border: "1px solid #D85FE9",
                marginBottom: ".5rem"
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box >
  )
}

function Header() {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href="/"
          styleSheet={{
            color: appConfig.theme.colors.primary["aqua"],
            hover: {
              backgroundColor: appConfig.theme.colors.primary["aqua"],
            }
          }}
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  function handleDeletarMensagem(id) {
    const listaFiltrada = props.mensagens.filter((mensagem) => mensagem.id !== id);
    props.setListaDeMensagens([...listaFiltrada]);
  }

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["100"],
        marginBottom: '16px',
      }}
    >

      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              backgroundColor: "rgba(0, 0, 0, .3)",
              hover: {
                backgroundColor: "rgba(0, 0, 0, .8)",
              }
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
                display: "flex",
                alignItems: "center",
                gap: "10px"

              }}
            >
              <Image
                styleSheet={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong" styleSheet={{
                color: appConfig.theme.colors.neutrals["100"],
              }}>
                {mensagem.de}
              </Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[200],
                }}
                tag="span"
              >
                {(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))}
              </Text>
              <Box
                styleSheet={{
                  width: "100%",
                  marginBottom: '8px',
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: "10px"
                }}
              >
                <Button
                  variant='tertiary'
                  type='button'
                  colorVariant='neutral'
                  label={<FcFullTrash size={20} />}
                  onClick={() => {
                    handleDeletarMensagem(mensagem.id)
                  }}
                  styleSheet={{
                    padding: "2px 5px",
                    color: appConfig.theme.colors.primary["aqua"],
                    border: "1px solid",
                    hover: {
                      borderColor: appConfig.theme.colors.primary["purple"],
                      backgroundColor: "rgba(0, 0, 0, .8)"
                    },
                    focus: {
                      backgroundColor: "rgba(0, 0, 0, .8)",
                      borderColor: appConfig.theme.colors.primary["purple"]
                    },
                  }}
                />
              </Box>
            </Box>
            {mensagem.texto}
          </Text>
        );
      })}

    </Box>
  )
}