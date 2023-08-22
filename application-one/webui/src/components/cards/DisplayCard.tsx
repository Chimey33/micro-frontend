import {Box, CardContent, Typography, Card} from "@mui/material";
import React from "react";
import styles from './DisplayCard.module.css'

export interface MetricCardProps {
    title: string;
    subtitle?: JSX.Element;
    children: JSX.Element;
}

export const DisplayCard = ({title, subtitle, children}: MetricCardProps) => {
    return (
        <Box sx={{ minWidth: 300, minHeight: 400, width: '100%' }}>
            <Card variant={'outlined'}>
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 24 }}
                            gutterBottom
                            className={styles['display-card__typography']}
                        >
                            {title}
                        </Typography>
                        {subtitle && <>subtitle</>}
                        {children}
                    </CardContent>
            </Card>
        </Box>
    )
}