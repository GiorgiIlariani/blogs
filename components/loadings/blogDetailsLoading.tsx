import { Skeleton } from "@mui/material";
import React from "react";

const BlogDetailsLoading = () => {
  return (
    <div className="bg-[#F3F2FA] pb-10">
      <div className="max-w-[720px] mx-auto flex flex-col my-10 px-6 sm:px-4 2xs:px-2">
        <Skeleton
          variant="rectangular"
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: "12px",
            width: "100%",
            height: "328px",
          }}
        />
        <div className="flex flex-col gap-6 mt-10 sm:mt-6">
          <div className="flex flex-col gap-4">
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem", bgcolor: "#FFFFFF", width: "160px" }}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem", bgcolor: "#FFFFFF", width: "300px" }}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem", bgcolor: "#FFFFFF", height: "50px" }}
            />
            <div className="w-full flex items-center flex-wrap gap-2">
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
            <div className="mt-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((description) => (
                <Skeleton
                  key={description}
                  variant="text"
                  sx={{ fontSize: "10px", bgcolor: "#FFFFFF", mt: 2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsLoading;
