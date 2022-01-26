import appConfig from "../config.json";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import { useRouter } from "next/router";
import React from "react";

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

// Componente React
// function HomePage() {
//   return (
//     <div>
//       <GlobalStyle />
//       <Title tag="h2">Boas vindas de volta!</Title>
//       <h2>Discord - Alura Matrix</h2>
//     </div>
//   )
// }

// export default HomePage;

export default function PaginaInicial() {
  const [user, setUser] = React.useState({});
  const roteamento = useRouter();

  const getUserData = (name) => {
    const url = `https://api.github.com/users/${name}`;
    fetch(url).then(resposta => {
      return resposta.json();
    }).then(dados => {
      const userGithub = {
        login: dados.login,
        location: dados.location,
        public_repos: dados.public_repos,
        followers: dados.followers
      }
      setUser(userGithub)
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
            onSubmit={function (event) {
              event.preventDefault();
              roteamento.push("/chat")
              // window.location.href = "/chat";
            }}
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

            {/* <input
              type="text"
              value={username}
              onChange={function (evento) {
                // Ode está o valor?
                const valor = evento.target.value;
                // Trocar o valor da variavel
                // através do React
                setUsername(valor);
              }}
            /> */}

            <TextField
              value={user.name}
              onChange={function (evento) {
                // Onde está o valor?
                let valor = evento.target.value
                const inputUser = {
                  login: valor
                }
                // Trocar o valor da variavel
                // através do React
                setUser(inputUser);
                getUserData(inputUser);
                console.log(user);
              }}
              fullWidth
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
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary["aqua"],
                mainColorLight: appConfig.theme.colors.primary["aqua"],
                mainColorStrong: appConfig.theme.colors.primary["purple"],
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
              src={user.name && user.name.length > 2 ? `https://github.com/${user.name}.png` : "/user_logo.png"}
            />
            {user.name && user.name.length > 2 && (
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.primary["aqua"],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {user.name}
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

            </Text>

          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}