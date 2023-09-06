import { Flex, Heading, Skeleton } from "monday-ui-react-core";
import React, { useCallback, useEffect, useState } from "react";
import { getWorkspaces } from "../../services/api_service";
import classes from "./header-component.module.scss";

const HeaderComponent = ({ context }) => {
  const [workspaceData, setWorkspaceData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchWorkspaceData = useCallback(async () => {
    if (!context.workspaceId) return;

    setIsLoading(true);
    const [fetchedWorkspaceData] = await getWorkspaces(context.workspaceId);
    setWorkspaceData(fetchedWorkspaceData);
    setIsLoading(false);
  }, [context.workspaceId]);

  useEffect(() => {
    fetchWorkspaceData();
  }, [context.workspaceId, fetchWorkspaceData]);

  return (
    <Flex className={classes.headerComponent}>
      {isLoading ? (
        <Skeleton type={Skeleton.types.RECTANGLE} size={Skeleton.sizes.TEXT} />
      ) : (
        <Heading value={workspaceData?.name} />
      )}
    </Flex>
  );
};

export default HeaderComponent;
