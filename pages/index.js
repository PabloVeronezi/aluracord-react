import appConfig from "../config.json";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import { useRouter } from "next/router";
import React from "react";
import { FcSearch } from "react-icons/fc";

function Title(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx> {`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals["000"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}
      </style>
    </>
  );
}

export default function PaginaInicial() {
  const [user, setUser] = React.useState({
    login: 'PabloVeronezi'
  });
  const roteamento = useRouter();

  async function getUserData(nome) {
    const url = `https://api.github.com/users/${nome}`;
    const service = await fetch(url).then(resposta => {
      return resposta.json();
    }).then(dados => {
      if (dados.message !== undefined) {
        const userGithub = {
          login: dados.login,
          location: dados.location,
          public_repos: dados.public_repos,
          followers: dados.followers
        }
        setUser(userGithub)
      }
      // Gambiarra
    })
  }

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[400],
          backgroundImage: 'url(/react.png)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply', backgroundPosition: "center",
          border: `1px solid ${appConfig.theme.colors.primary["aqua"]}`,
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '600px',
            borderRadius: '10px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[100],
            backgroundImage: 'url(/react.png)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply', backgroundPosition: "center",
            opacity: .9
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '15px',
            }}
          >
            <Title tag="h2">Boas vindas de volta!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '15px', color: appConfig.theme.colors.neutrals[100], fontSize: "1.2rem" }}
            >
              {appConfig.name}
            </Text>

            <div style={{
              display: "flex", gap: "1rem"
            }}>
              <TextField
                value={user.login}
                onChange={function (evento) {
                  // Onde está o valor?
                  let valor = evento.target.value
                  // Trocar o valor da variavel
                  // através do React
                  let userInputValue = {
                    ...user,
                    login: valor
                  }
                  setUser(userInputValue)
                }}
                placeholder="Usuário GitHub"
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.primary["purple"],
                    mainColorHighlight: appConfig.theme.colors.primary["aqua"],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                  },
                }}
              />

              <Button
                type='button'
                label={<FcSearch size={20} />}
                onClick={() => {
                  getUserData(user.login)
                }}
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColorLight: appConfig.theme.colors.primary["100"],
                  mainColorStrong: appConfig.theme.colors.primary["purple"],
                }}
                styleSheet={{
                  padding: "4px 8px",
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  border: "1px solid #D85FE9",
                  marginBottom: ".5rem"
                }}
              />
            </div>

            <Button
              type='submit'
              label='Entrar'
              // fullWidth
              onClick={function (event) {
                event.preventDefault();
                roteamento.push("/chat")
                // window.location.href = "/chat";
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary["aqua"],
                mainColorLight: appConfig.theme.colors.primary["aqua"],
                mainColorStrong: appConfig.theme.colors.primary["purple"],
              }}
              styleSheet={{
                width: "15.6rem"
              }}
            />


          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[900],
              border: '1px solid',
              borderColor: appConfig.theme.colors.primary["aqua"],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={user.login !== undefined ? `https://github.com/${user.login}.png` : "/user_logo.png"}
            />
            {user.login && user.login.length > 2 && (
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.primary["aqua"],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {user.login}
              </Text>
            )}
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.primary["aqua"],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {user.location}
            </Text>

          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}