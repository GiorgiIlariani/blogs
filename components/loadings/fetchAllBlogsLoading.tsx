import { Skeleton } from "@mui/material";
import React from "react";

const FetchBlogsLoading = () => {
  return (
    <div className="w-full flex flex-wrap items-start blogsSection:justify-center gap-8 max-w-[1288px] mx-auto py-[96px]">
      {[1, 2, 3, 4, 5, 6].map((skeleton) => (
        <div className="w-[408px] flex flex-col gap-4 my-4" key={skeleton}>
          <Skeleton
            variant="rectangular"
            sx={{
              bgcolor: "#FFFFFF",
              borderRadius: "12px",
              width: "100%",
              height: "328px",
            }}
          />

          <div className="w-full flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", bgcolor: "#FFFFFF", width: "180px" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", bgcolor: "#FFFFFF", width: "130px" }}
              />
            </div>
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem", bgcolor: "#FFFFFF", height: "35px" }}
            />
            <div className="w-full flex items-center gap-4">
              {[1, 2, 3].map((categry) => (
                <Skeleton
                  key={categry}
                  variant="rectangular"
                  sx={{
                    bgcolor: "#FFFFFF",
                    borderRadius: "30px",
                    width: "30%",
                    height: "40px",
                  }}
                />
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", bgcolor: "#FFFFFF" }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FetchBlogsLoading;
