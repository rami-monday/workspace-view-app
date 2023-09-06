import { useCallback, useEffect, useState } from "react";
import mondaySdk from "monday-sdk-js";
import { Flex } from "monday-ui-react-core";
import { getWorkspaceBoards } from "./services/api_service";
import classes from "./app.module.scss";
import BoardsComponent from "./components/boards/boards-component";
import HeaderComponent from "./components/header/header-component";
import "monday-ui-react-core/dist/main.css";

const monday = mondaySdk();

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState({});
  const [boards, setBoards] = useState([]);

  const fetchBoards = useCallback(async () => {
    if (!context.workspaceId) return;

    setIsLoading(true);
    const fetchedBoards = await getWorkspaceBoards(context.workspaceId);
    if (fetchedBoards) {
      setBoards(fetchedBoards);
    }
    setIsLoading(false);
  }, [context.workspaceId, setIsLoading, setBoards]);

  useEffect(() => {
    if (context.workspaceId) {
      fetchBoards();
    }
  }, [context.workspaceId, fetchBoards]);

  useEffect(() => {
    monday.listen("context", (res) => {
      setContext(res.data);
    });
  }, []);

  return (
    <Flex
      className={classes.main}
      direction={Flex.directions.COLUMN}
      align={Flex.align.CENTER}
      justify={Flex.justify.START}
    >
      <HeaderComponent context={context} />
      <BoardsComponent boards={boards} isLoading={isLoading} />
    </Flex>
  );
}

export default App;
